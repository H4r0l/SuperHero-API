import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../API/FetchData";
import svg from "../assets/svgviewer-output.svg";
import filter from "../assets/filter.svg";
const Gallery = () => {
  const dispatch = useDispatch();
  const { heroes, loading, error } = useSelector((state) => state.heroes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const filteredHeroes = heroes.filter((hero) => {
    return hero.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const sortHeroesByPowerstats = (a, b) => {
    if (filterOption === "intelligence") {
      return b.powerstats.intelligence - a.powerstats.intelligence;
    } else if (filterOption === "strength") {
      return b.powerstats.strength - a.powerstats.strength;
    } else if (filterOption === "speed") {
      return b.powerstats.speed - a.powerstats.speed;
    } else if (filterOption === "durability") {
      return b.powerstats.durability - a.powerstats.durability;
    } else if (filterOption === "power") {
      return b.powerstats.power - a.powerstats.power;
    } else if (filterOption === "combat") {
      return b.powerstats.combat - a.powerstats.combat;
    } else if (filterOption === "eyeColor") {
      return b.appearance?.eyeColor?.localeCompare(a.appearance?.eyeColor) || 0;
    } else if (filterOption === "hairColor") {
      return (
        b.appearance?.hairColor?.localeCompare(a.appearance?.hairColor) || 0
      );
    } else if (filterOption === "gender") {
      return b.appearance?.gender?.localeCompare(a.appearance?.gender) || 0;
    } else if (filterOption === "race") {
      return b.appearance?.race?.localeCompare(a.appearance?.race) || 0;
    } else if (filterOption === "height") {
      const heightA = parseInt(a.appearance.height[1]);
      const heightB = parseInt(b.appearance.height[1]);
      return heightB - heightA;
    } else if (filterOption === "weight") {
      const weightA = parseInt(a.appearance.weight[1]);
      const weightB = parseInt(b.appearance.weight[1]);
      return weightB - weightA;
    }
    return 0;
  };
  const sortedHeroes = [...filteredHeroes].sort(sortHeroesByPowerstats);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleOptionSelect = (option) => {
    setFilterOption(option);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div
        class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col items-center text-center ">
      <div className="h-full w-full bg-greaTeal p-4 flex justify-center">
        <img src={svg} alt="" className="w-1/2" />
      </div>
      <div className="m-2 p-2 text-black flex flex-row justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Hero name"
          className="w-auto ml-1 p-2 font-Fredoka text-sm text-specialGray bg-lightRed rounded-lg sm:w-64 md:w-96"
        />

        <div className="bg-lightRed w-auto rounded-lg ml-2">
          <button className="p-2" onClick={handleDropdownToggle}>
            <img src={filter} alt="" />
          </button>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu w-full sm:w-64 md:w-96 xl:w-128 bg-lightRed rounded-lg font-Fredoka shadow flex justify-center font-medium">
          <div className="flex flex-col">
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("name")}
            >
              Name
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("intelligence")}
            >
              Intelligence
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("strength")}
            >
              Strength
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("speed")}
            >
              Speed
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("durability")}
            >
              Durability
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("power")}
            >
              Power
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("combat")}
            >
              Combat
            </button>
          </div>
          {/* Appearance */}
          <div className="flex flex-col">
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("name")}
            >
              Appearance
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("eyeColor")}
            >
              Eye Color
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("hairColor")}
            >
              Hair Color
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("gender")}
            >
              Gender
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("race")}
            >
              Race
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("height")}
            >
              Height
            </button>
            <button
              className="dropdown-option py-2 px-4 hover:bg-gray-100"
              onClick={() => handleOptionSelect("weight")}
            >
              Weight
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedHeroes.length === 0 ? (
          <div>No superheroes found.</div>
        ) : (
          sortedHeroes.map((hero) => (
            <div
              className="card w-auto m-2 p-2 bg-greaTeal text-white flex flex-col items-center rounded-lg"
              key={hero.id}
            >
              <img
                src={hero.image.url}
                alt="superhero"
                className="w-1/2 h-auto rounded-t-lg"
              />
              <h2 className="font-Bangers text-2xl text-center">{hero.name}</h2>
              <p className="font-Fredoka text-xl font-bold">Powerstats:</p>
              <ul className="font-Poppins font-medium">
                <li>Intelligence: {hero.powerstats.intelligence}</li>
                <li>Strength: {hero.powerstats.strength}</li>
                <li>Speed: {hero.powerstats.speed}</li>
                <li>Durability: {hero.powerstats.durability}</li>
                <li>Power: {hero.powerstats.power}</li>
                <li>Combat: {hero.powerstats.combat}</li>
                {/* Add more powerstats as needed */}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default React.memo(Gallery);
