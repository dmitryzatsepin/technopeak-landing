// src/utils/sendToBitrix.ts
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { rem } from '@mantine/core'; // Если будете использовать rem для иконок

// URL Вебхука (лучше всего вынести в переменные окружения .env)
const BITRIX_WEBHOOK_URL = import.meta.env.VITE_BITRIX_WEBHOOK_URL;

if (!BITRIX_WEBHOOK_URL) {
  console.error("Bitrix webhook URL is not defined! Check VITE_BITRIX_WEBHOOK_URL environment variable.");
}

export interface BitrixLeadPayload {
  TITLE: string;
  NAME?: string;
  PHONE?: Array<{ VALUE: string; VALUE_TYPE: string }>;
  EMAIL?: Array<{ VALUE: string; VALUE_TYPE: string }>;
  COMMENTS?: string;
  SOURCE_ID?: string;
  ASSIGNED_BY_ID?: number;
  [key: string]: any; // передавать любые другие поля
}

interface BitrixResponse {
  result?: number | boolean | object;
  error?: string;
  error_description?: string;
  custom_message?: string;
}

export async function sendToBitrix(
  leadDataFields: BitrixLeadPayload,
  formType: string
): Promise<boolean> {
  const dataToSend = {
    fields: {
      ...leadDataFields,
      TITLE: leadDataFields.TITLE || `Website Request - ${formType} - ${leadDataFields.NAME || 'Anonymous'}`,
      SOURCE_ID: leadDataFields.SOURCE_ID || 'WEBFORM',
    },
  };

  console.log(`[sendToBitrix] Sending data for form "${formType}":`, JSON.stringify(dataToSend, null, 2));

  try {
    const response = await fetch(BITRIX_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const resultText = await response.text();
    let parsedResult: BitrixResponse = {};
    
    try {
      parsedResult = JSON.parse(resultText);
      console.log(`[sendToBitrix] Parsed response for "${formType}":`, parsedResult);
    } catch (e) {
      console.error(`[sendToBitrix] Failed to parse JSON response for "${formType}":`, resultText, e);
      if (response.ok) {
        parsedResult = { result: true, custom_message: "OK status but non-JSON response." };
      } else {
        parsedResult = { error_description: `Server returned ${response.status} with non-JSON body.`, error: 'http_error_non_json' };
      }
    }

    if (response.ok && parsedResult.result !== undefined) { // Успех, если есть поле result (ID лида, true, etc.)
      console.log(`[sendToBitrix] SUCCESS for "${formType}". Result:`, parsedResult.result);
      notifications.show({
        title: 'Success!',
        message: `Thank you! Your request ("${formType}") has been sent. We will contact you soon.`,
        color: 'teal',
        icon: <IconCheck size={18} />,
        autoClose: 5000,
      });
      return true;
    } else {
      console.error(`[sendToBitrix] FAILED or unexpected response for "${formType}". OK: ${response.ok}, Result:`, parsedResult);
      notifications.show({
        title: 'Submission Error',
        message: parsedResult.error_description || parsedResult.error || parsedResult.custom_message || 'An error occurred while submitting your request. Please try again.',
        color: response.ok ? 'blue' : 'red',
        icon: <IconX size={18} />,
        autoClose: 7000,
      });
      return false;
    }
  } catch (error) {
    console.error(`[sendToBitrix] Network or fetch error for "${formType}":`, error);
    notifications.show({
      title: 'Network Error!',
      message: 'Could not connect. Please check your connection and try again.',
      color: 'red',
      icon: <IconX size={18} />,
      autoClose: 7000,
    });
    return false;
  }
}