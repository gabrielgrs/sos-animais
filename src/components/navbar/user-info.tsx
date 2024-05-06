'use client'

import { useTheme } from 'next-themes'
import { LogOut, LucideIcon, Moon, Sun, UserCog } from 'lucide-react'
import { logout } from '~/actions/auth'
import { Link } from '~/components/link'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '~/components/ui/dropdown-menu'
import { UserSchema } from '~/libs/drizzle/types'

type DropdownItemProps = {
  onClick?: () => void
  href?: string
  text: string
  icon: LucideIcon
}

const dropdownItemStyles = 'cursor-pointer flex items-center gap-2 py-2'

function DropdownItem({ onClick, text, icon: Icon, href }: DropdownItemProps) {
  if (href) {
    return (
      <DropdownMenuItem className={dropdownItemStyles} asChild>
        <Link href={href}>
          {Icon && <Icon size={20} />}
          <span>{text}</span>
        </Link>
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenuItem className={dropdownItemStyles} onClick={onClick}>
      <Icon size={20} />
      <span>{text}</span>
    </DropdownMenuItem>
  )
}

type Props = {
  user: UserSchema
}

export function UserInfo({ user }: Props) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-7 w-7">
          <AvatarImage src={'https://aui.atlassian.com/aui/9.3/docs/images/avatar-person.svg'} alt={`${user.email}`} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[160px]">
        <DropdownMenuLabel className="opacity-60 text-sm font-thin max-w-[130px] truncate">Conta</DropdownMenuLabel>
        <div className="flex flex-col px-2">
          <span className="text-sm">{user.name}</span>
          <span className="text-sm opacity-70">{user.email}</span>
        </div>

        <DropdownMenuSeparator />
        <DropdownItem href="/configuracoes" icon={UserCog} text="Configurações" />
        <DropdownItem
          icon={theme === 'dark' ? Sun : Moon}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          text="Trocar tema"
        />

        <DropdownMenuSeparator />
        <form action={() => logout().then(() => (window.location.href = '/'))}>
          <DropdownMenuItem className={dropdownItemStyles} asChild>
            <button type="submit" className="w-full">
              <LogOut size={20} />
              <span>Sair da conta</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
