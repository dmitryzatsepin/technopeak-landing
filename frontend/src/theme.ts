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
  fontFamily: `'Graphik LCG', sans-serif`, // Базовый шрифт для текста (<Text>, <Button>, etc.)
  headings: {
    fontFamily: `'Navigo', sans-serif`, // Шрифт для заголовков (<Title>)
    // Можно задать вес по умолчанию для разных уровней заголовков
    // fontWeight: '500', // Например, все заголовки Medium по умолчанию
    sizes: {
    h1: { fontWeight: '700' }, // h1 будет Bold
    h2: { fontWeight: '500' }, // h2 будет Medium
    h3: { fontWeight: '200' }, // h3 будет Regular
    h4: { fontWeight: '200' }, // h4 будет Regular
    h5: { fontWeight: '200' }, // h5 будет Regular
  },
  },
  // Устанавливаем основной цвет (например, для кнопок без явного color)
  //primaryColor: 'mantine-color-black',

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
        radius: 0,
      },
    },
    ActionIcon: {
      defaultProps: {
      }
    },  
    // Настройка Popover (Dropdown - это выпадающая часть)
    PopoverDropdown: {
      styles: {
        dropdown: { borderRadius: '0 !important' }
      }
    },
    // Настройка Accordion
    Accordion: {
      styles: {
          item: { borderRadius: 0 },
          control: { borderRadius: 0 },
          panel: { borderRadius: 0 } 
      }
    },
  },
});