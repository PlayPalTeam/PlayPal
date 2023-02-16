import BlockItem from '@components/BlockItem';
import { useState } from 'react';
import { useUserProfile } from '@context/UserProfileContext';

const Index = () => {
  const { allData } = useUserProfile();
  const [selectedOption, setSelectedOption] = useState('all');
  const [searchBox, setSearchBox] = useState('');

  const filteredData = allData?.filter((el) => {
    if (searchBox === '') {
      return el;
    } else {
      return el.username?.toLowerCase().includes(searchBox.toLowerCase());
    }
  });
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
            onClick={() => {
              setSearchBox('');
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
            }}
            value={searchBox}
          />
        </div>

        <div>
          <div className="mt-12">
            {searchBox.length > 0 && (
              <div>
                <div>
                  {filteredData?.map((item) => (
                    <BlockItem key={item.id} userData={item} />
                  ))}
                </div>
                <div>{filteredData.length === 0 && <div>No Match Found</div>}</div>
              </div>
            )}

            {searchBox.length === 0 && selectedOption === 'all' && (
              <div>{allData?.map((data) => data.role !== 'moderator' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
            {searchBox.length === 0 && selectedOption === 'users' && (
              <div>{allData?.map((data) => data.role === 'user' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
            {searchBox.length === 0 && selectedOption === 'listers' && (
              <div>{allData?.map((data) => data.role === 'lister' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
