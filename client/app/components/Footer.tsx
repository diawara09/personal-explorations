export default function Footer() {
  return (
    <>
      <div className="relative h-60 w-full">
        <div className="overflow-y-auto relative h-full w-full  pe-2">
          <div className="flex w-full flex-col gap-4">
           
          </div>

          <footer className="footer bg-base-200 -bottom-px sticky start-0 w-full px-6 py-4">
            <aside className="grid-flow-col items-center">
              <p>
                ©2024{" "}
                <a className="link link-hover font-medium" href="#">
                  FlyonUI
                </a>
              </p>
            </aside>
            <nav className="text-base-content grid-flow-col gap-4 md:place-self-center md:justify-self-end">
              <a className="link link-hover" href="#">
                License
              </a>
              <a className="link link-hover" href="#">
                Help
              </a>
              <a className="link link-hover" href="#">
                Contact
              </a>
              <a className="link link-hover" href="#">
                Policy
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
}
