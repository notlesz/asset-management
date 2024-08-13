import { tv, VariantProps } from 'tailwind-variants'

import { HTMLProps } from 'react'
import { cn } from '../../utils/cn'

const loadingStyles = tv({
  base: 'animate-spin border-solid border-white border-t-main rounded-full',
  variants: {
    size: {
      small: 'w-[20px] h-[20px] border-[3px]',
      medium: 'w-[40px] h-[40px] border-[6px]',
      large: 'w-[60px] h-[60px] border-[8px]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

type ButtonVariants = VariantProps<typeof loadingStyles>

interface LoadingProps {
  className?: HTMLProps<HTMLElement>['className']
  size?: ButtonVariants['size']
}

export default function Loading({ size, className }: LoadingProps) {
  return <span className={cn(loadingStyles({ size }), className)} />
}
