tailwind.config = {
    theme: {
        extend: {
            colors: {
                olimpus: {
                    bg: '#ededf1',
                    card: '#ffffff',
                    surface: '#f4f4f7',
                    gold: '#730202',
                    goldLight: '#8f0404',
                    goldDark: '#520101',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Oswald', 'sans-serif'],
            },
            boxShadow: {
                'gold': '0 10px 30px -5px rgba(115, 2, 2, 0.18)',
                'gold-lg': '0 20px 40px -10px rgba(115, 2, 2, 0.25)',
            }
        }
    }
}