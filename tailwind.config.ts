import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#201640',        // لون ثابت
                    dark: '#050b1f',           // للخلفيات الداكنة
                    light: '#bbbbbe',          // للخلفيات الفاتحة
                    textDark: '#0f0f0f',       // للخط في Light Mode
                    textLight: '#f4f4f4'       // للخط في Dark Mode
                }
            },
            backgroundImage: {
                'hero-gradient': "linear-gradient(25deg,#201640_30%,#050b1f_60%,#030a1c_90%)",
            }
        }
    },
    plugins: []
};

export default config;
