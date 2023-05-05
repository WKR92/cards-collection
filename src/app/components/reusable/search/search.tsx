import React from "react";

interface ISearch {
  customOnInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Search: React.FC<ISearch> = ({ customOnInput }) => {
  return (
    <div className="h-[42px] w-[270px] sm:mb-0 mx-auto sm:mx-0">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="h-[42px] relative text-white m-0 -mr-0.5 block w-[250px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
          onInput={(e) => customOnInput(e)}
        />
      </div>
    </div>
  );
};

export default Search;
