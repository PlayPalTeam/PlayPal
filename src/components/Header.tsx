import { Popover } from "@headlessui/react"
import Link from "next/link"
import Avatar from "./Avatar"

const Header = () => {
  return (
    <div className="flex justify-between items-center max-md:p-5 p-10">
      <section>
        Search Bar
      </section>
      <section>
        <Popover className={"relative"}>
          <Popover.Button className={"ui-open:border-4 ui-open:rounded-full border-transparent ui-open:border-green-400 border-4"}><Avatar /></Popover.Button>
          <Popover.Panel className={"absolute z-10 shadow-md"}>
            <Link href="#">Profile</Link>
          </Popover.Panel>
        </Popover>
      </section>
    </div>
  )
}

export default Header