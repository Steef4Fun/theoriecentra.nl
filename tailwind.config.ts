import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  	extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
        'dark-background': 'hsl(var(--dark-background))',
        'dark-foreground': 'hsl(var(--dark-foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))'
        },
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  		},
  		borderRadius: {
        xl: `calc(var(--radius) + 8px)`, // 16px
  			lg: `calc(var(--radius) + 4px)`, // 12px
  			md: 'var(--radius)', // 8px
  			sm: 'calc(var(--radius) - 4px)' // 4px
  		},
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.9375rem',   // 15px
        'base': '1.125rem',    // 18px
        'lg': '1.5rem',      // 24px
        'xl': '1.875rem',   // 30px
        '2xl': '2.3125rem',  // 37px
        '3xl': '2.875rem',   // 46px
        '4xl': '3.5rem',     // 56px
        '5xl': '4.5rem',     // 72px
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.4',
        'normal': '1.5',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0em',
        'wide': '0.05em',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px hsl(var(--primary) / 0.1)',
      },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;