import React from "react";

const TagSelect = ({ gifs, handleSelect }) => {
  const defaultFilter = ["all"];

  const filtersFromTags = Array.from(new Set(gifs.map(gif => gif.category)));

  const filters = [...defaultFilter, ...filtersFromTags];

  return (
    <div>
      <div className="select is-primary">
        <select onChange={handleSelect}>
          {filters.map(filter => {
            if (filter.length) {
              return (
                <option value={filter} key={filter}>
                  {filter}
                </option>
              );
            }
          })}
        </select>
      </div>
    </div>
  );
};

export { TagSelect };
