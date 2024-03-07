import { ReactNode } from "react"
import { Icon, Icons } from "./icons"
import Link from "next/link";

type IconClass = typeof Icons.arrowRight;

const SidePanelButton = ({
  Icon,
  text,
  href,

}: { Icon: IconClass; text: string; href: string; }) => {
  return (
    <li>
      <Link href={href} className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" >
        <Icon />
        <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
      </Link>
    </li>
  )
}


export const SidePanelLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 bg-white dark:bg-slate-900 flex flex-row">
      <aside id="sidebar" className="z-40 w-64 transition-transform" aria-label="Sidebar">
        <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div href="#" className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
            <span className="ml-3 text-base font-semibold">MoodBoard</span>
          </div>
          <ul className="space-y-2 text-sm font-medium">
            <SidePanelButton
              text="Assets"
              Icon={Icons.archive}
              href="/assets"
            />
            <SidePanelButton
              text="Boards"
              Icon={Icons.galleryVertical}
              href="/boards"
            />
            <SidePanelButton
              text="Models"
              Icon={Icons.want}
              href="/models"
            />
          </ul>
          <div className="mt-auto flex">
            <div className="flex w-full justify-between">
              <span className="text-sm font-medium text-black dark:text-white">email@example.com</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-roledescription="more menu" fill="none" stroke="currentColor" stroke-width="2" className="h-5 w-5 text-black dark:text-white" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-horizontal">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>
          </div>
        </div>
      </aside>
      {children}
    </div>

  )

}

