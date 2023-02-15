import BlockItem from '@components/BlockItem';
import { useState } from 'react';
import { useUserProfile } from '@context/UserProfileContext';

const Index = () => {
  const { allData } = useUserProfile();
  const [selectedOption, setSelectedOption] = useState('all');
  const [searchBox, setSearchBox] = useState('');
  const [displayValue, setDisplayValue] = useState("")

  const nowSearching =(e)=>{
    console.log(e)
  }
  return (
    <>
      <div>
        <div className="flex gap-10">
          <select
            name="choice"
            id="choice"
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          >
            <option value="all">ALL</option>
            <option value="users">USERS</option>
            <option value="listers">LISTERS</option>
          </select>

          <input
            type="text"
            name="psearch"
            placeholder="Search By UserName"
            onChange={(e) => {
              setSearchBox(e.target.value);
              nowSearching(e)
            }}
            value={searchBox}
          />
        </div>

        <div>
          <div>
            {selectedOption === 'all' && (
              <div>{allData?.map((data) => data.role !== 'moderator' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
            {selectedOption === 'users' && <div>{allData?.map((data) => data.role === 'user' && <BlockItem key={data.id} userData={data} />)}</div>}
            {selectedOption === 'listers' && (
              <div>{allData?.map((data) => data.role === 'lister' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
          </div>
          <div className="mt-16">
            {' '}
            Search Box
            {allData?.map((data) => data.username === searchBox && <BlockItem key={data.id} userData={data} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
