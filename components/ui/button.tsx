import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-full web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-brand web:hover:opacity-90 active:opacity-90', // mod
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        outline:
          'border border-brand bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline ',
        small: 'border border-brand rounded-full py-1',
        kakao: 'bg-[#FEE500]',
      },
      size: {
        // default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
        default: 'px-4 py-4', // mod
        small: 'px-4 py-[7px]', // add
        sm: 'h-9 rounded-md px-3',
        base: '', // add
        // lg: 'h-11 rounded-md px-8 native:h-14',
        lg: 'px-4 py-4',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap text-sm native:text-base font-Pretendard-Regular text-foreground web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-white text-base', // mod
        destructive: 'text-destructive-foreground',
        outline: 'text-brand group-active:text-accent-foreground', // mod
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
        small: 'text-brand',
        kakao: 'text-[#000000]',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-[16px]',
        base: 'native:text-[16px]', // add
        icon: '',
        small: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <TextClassContext.Provider
        value={cn(buttonTextVariants({ variant, size }), props.disabled && 'text-[#999]')}>
        <Pressable
          className={cn(
            buttonVariants({ variant, size, className }),
            props.disabled && 'bg-[#F1F1F5] web:pointer-events-none',
            props.disabled && size === 'default' && 'border-[#E5E5EC] bg-[#E5E5EC]',
          )}
          ref={ref}
          role='button'
          {...props}
        />
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
