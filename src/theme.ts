import { createTheme, MantineColorsTuple } from '@mantine/core';

// Генерируем примерные палитры для ваших цветов.
// Вы можете использовать онлайн-генераторы палитр Mantine для более точных оттенков.
// Важно, чтобы основной цвет (тот, что вы задали) был примерно на 5-м или 6-м индексе.
const accentPink: MantineColorsTuple = [
  '#ffe3f0', // light 0
  '#ffb1d1', // 1
  '#ff7fa3', // 2
  '#ff4d7e', // 3
  '#ff1a5a', // 4
  '#ff006e', // main 5 <-- Ваш цвет
  '#f0005f', // 6
  '#d70054', // 7
  '#bf0049', // 8
  '#a8003f'  // dark 9
];

const accentGreen: MantineColorsTuple = [
  '#e0fcf7', // light 0
  '#b3f2e8', // 1
  '#87e8da', // 2
  '#5cdcce', // 3
  '#3bd1c2', // 4
  '#1de1bd', // 5
  '#00D6B3', // 6 <-- Ваш цвет (близко)
  '#00c5b3', // main 7 <-- Ваш цвет
  '#00b0a0', // 8
  '#009c8d'  // dark 9
];


export const theme = createTheme({
  /* Добавьте сюда другие глобальные настройки темы */
  // fontFamily: 'Verdana, sans-serif', // Пример: смена шрифта

  // Устанавливаем основной цвет (например, для кнопок без явного color)
  primaryColor: 'accentPink',

  // Добавляем ваши фирменные цвета в палитру Mantine
  colors: {
    accentPink,
    accentGreen,
  },

  // Глобально убираем скругление у ключевых компонентов
  components: {
    Button: {
      defaultProps: {
        radius: 0,
      },
    },
    TextInput: {
      defaultProps: {
        radius: 0,
      },
    },
    Textarea: {
      defaultProps: {
        radius: 0,
      },
    },
    Card: {
      defaultProps: {
        radius: 0,
      },
    },
    Badge: {
      defaultProps: {
        radius: 0, // Для бейджей в Portfolio
      },
    },
    ActionIcon: {
      defaultProps: {
         // ActionIcon часто круглый, но если используете квадратные - можно задать radius: 0
         // radius: 0,
      }
    },
    // Настройка Popover (Dropdown - это выпадающая часть)
    PopoverDropdown: {
      styles: {
        dropdown: { borderRadius: '0 !important' } // Используем !important для надежности
      }
    },
    // Настройка Accordion
    Accordion: {
      styles: {
          item: { borderRadius: 0 }, // Для контейнера элемента
          control: { borderRadius: 0 }, // Для кликабельной части
          panel: { borderRadius: 0 } // Для панели с контентом
      }
    },
     // Другие компоненты, если необходимо...
     // Например, для ThemeIcon (хотя он часто круглый по дизайну):
     // ThemeIcon: {
     //   defaultProps: {
     //     radius: 0,
     //   },
     // },
  },

  // Можно также установить глобальный радиус по умолчанию, но component overrides надежнее
  // defaultRadius: 0,
});