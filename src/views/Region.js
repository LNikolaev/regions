import React, {useEffect, useState} from 'react';
import '../styles/styles.scss'
import InfoRegionPopup from "../js/components/popups/InfoRegionPopup";
import CreateRegionPopup from "../js/components/popups/CreateRegionPopup";
import EditRegionPopup from "../js/components/popups/EditRegionPopup";
import DeleteRegionPopup from "../js/components/popups/DeleteRegionPopup";
import Table from "../js/components/Table";
import Search from "../js/components/Search";

const Region = () => {

  const BASE_URL = 'http://localhost:3004/'

  const initialRegionState = {
    id: null,
    name: "",
    countries: [{}],
    isActive: false
  };
  const initialRegionArrayState = [{
    id: null,
    name: "",
    countries: [{}],
    isActive: false
  }];
  const [currentRegion, setCurrentRegion] = useState(initialRegionState);
  const [regions, setRegions] = useState(initialRegionArrayState);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  };
  const toggleCreate = () => {
    setShowCreate(!showCreate)
  };
  const toggleEdit = () => {
    setShowEdit(!showEdit)
  };
  const toggleDelete = () => {
    setShowDelete(!showDelete)
  };

  const updateRegionState = (region) => {
    setCurrentRegion(region);
    setRegions([...regions, currentRegion])
  };

  const updateCurrentRegion = (region) => {
    setCurrentRegion(region);
  };

  const removeRegion = (regionId) => {
    setRegions(regions.filter(region => region.id !== regionId));
  };

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    fetch(
      BASE_URL + 'regions',
      {
        method: "GET",
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setRegions(response);
        const filteredData = response.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
      })
      .catch(error => console.log(error));
  }

  const handleSearchInput = event => {
    setSearchInput(event.target.value)
    if (searchInput !== '') {
      const filteredData = regions.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(regions)
    }
  };

  return (
    <div>
      <Search
        handleSearchInput={handleSearchInput}
        toggleCreate={toggleCreate}
      />
      {searchInput.length > 1 ? (
        <Table
          filteredData={filteredResults}
          updateRegion={updateCurrentRegion}
          toggleInfo={toggleInfo}
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
        />
      ) : (
        <Table
          filteredData={regions}
          updateRegion={updateCurrentRegion}
          toggleInfo={toggleInfo}
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
        />
      )
      }

      <InfoRegionPopup
        show={showInfo}
        currentRegion={currentRegion}
        close={toggleInfo}/>

      <CreateRegionPopup
        show={showCreate}
        updateRegionState={updateRegionState}
        refresh={fetchData}
        close={toggleCreate}/>

      <EditRegionPopup
        show={showEdit}
        region={currentRegion}
        updateRegionState={updateRegionState}
        refresh={fetchData}
        close={toggleEdit}/>

      <DeleteRegionPopup
        show={showDelete}
        region={currentRegion}
        updateRegionState={removeRegion}
        refresh={fetchData}
        close={toggleDelete}/>
    </div>);
};

export default Region;
