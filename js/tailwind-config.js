tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                solar: {
                    yellow: '#F59E0B',
                    amber: '#D97706',
                    orange: '#EA580C',
                    navy: '#0F172A',
                    slate: '#1E293B',
                    green: '#059669',
                    emerald: '#10B981',
                    bg: '#F8FAFC',
                    card: '#FFFFFF',
                }
            },
            boxShadow: {
                'soft': '0 10px 30px -5px rgba(15, 23, 42, 0.05)',
                'glow': '0 0 25px rgba(245, 158, 11, 0.25)',
                'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
            }
        }
    }
};
