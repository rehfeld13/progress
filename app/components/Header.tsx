"use client"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react"

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCharacter } from "../context/CharacterContext"

const navigation = [
  { name: "Início", href: "/" },
  { name: "Loja", href: "/store" },
  { name: "Inventário", href: "/inventory" },
]

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export default function Header() {
  const pathname = usePathname()

  const { character } = useCharacter();

  return (
    <Disclosure
      as="nav"
      className="relative inset-x-0 top-0 z-50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px"
    >
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                alt="Logo"
                src="/logo.png"
                width={32}
                height={32}
                priority
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isCurrent = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={classNames(
                        isCurrent
                          ? "bg-gray-900 text-white dark:bg-gray-950/50"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium",
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {character && (
              <div className="flex items-center gap-1 text-yellow-400 font-bold">
                <Image src="/coin.png" alt="Coins" width={35} height={35} />
                <span>{character.coins}</span>
              </div>
            )}

            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <Image
                  alt="Avatar"
                  src="/avatar.png"
                  width={32}
                  height={32}
                  className="rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
              >
                <MenuItem>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                  >
                    Perfil
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                  >
                    Configurações
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                  >
                    Sair
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={classNames(
                  isCurrent
                    ? "bg-gray-900 text-white dark:bg-gray-950/50"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {item.name}
              </DisclosureButton>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
