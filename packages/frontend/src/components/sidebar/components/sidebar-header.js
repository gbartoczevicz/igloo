const SidebarHeader = () => {
    return (
      <>
        <div className="pt-4 pb-2 px-6">
          <a href="#!">
            <div className="flex items-center">
              <div className="shrink-0">
              <img 
            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" className="rounded-full w-12"
            />
              </div>
              <div className="grow ml-3">
                <p className="text-sm font-semibold">Matheus Diori</p>
              </div>
            </div>
          </a>
        </div>
      </>
    )
  };

  export default SidebarHeader;