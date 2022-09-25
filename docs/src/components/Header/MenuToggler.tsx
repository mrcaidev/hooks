import { useBoolean } from "@mrcaidev/hooks";
import { createPortal } from "react-dom";
import { Menu } from "react-feather";
import ThemeToggler from "./ThemeToggler";

interface Props {
  nav?: string;
  github?: string;
}

const MenuToggler = ({ nav, github }: Props) => {
  const { value: isOpen, on: open, off: close } = useBoolean();

  return (
    <>
      <button
        type="button"
        onClick={isOpen ? close : open}
        aria-label="Toggle menu"
        className="p-2 hover:text-highlight"
      >
        <Menu size="24" />
      </button>
      {!import.meta.env.SSR &&
        isOpen &&
        createPortal(
          <div className="fixed top-0 left-0 right-0 bottom-0 pt-20 bg-normal">
            <div className="max-h-full px-12 overflow-auto">
              {nav}
              <div className="flex justify-center gap-4 py-4">
                {github}
                <ThemeToggler />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default MenuToggler;
