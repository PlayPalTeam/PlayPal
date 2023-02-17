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
        <div className="m-4 mt-16 mb-4 flex justify-between sm:ml-32  sm:mr-32">
          <select
            name="choice"
            id="choice"
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            onClick={() => {
              setSearchBox('');
            }}
            className="select-primary select focus:outline-none"
          >
            <option value="all">ALL</option>
            <option value="users">USERS</option>
            <option value="listers">LISTERS</option>
          </select>

          <input
            type="text"
            name="psearch"
            placeholder="Search By UserName "
            onChange={(e) => {
              setSearchBox(e.target.value);
            }}
            value={searchBox}
            className="input-primary input focus:outline-none"
          />
        </div>

        <div className="rounded-xl  border border-slate-600 sm:ml-32 sm:mr-32  ">
          <div className="flex justify-around rounded-xl border border-slate-600 pt-2 pb-2">
            <div>USERNAME</div>
            <div>FULL NAME</div>
            <div>ACTION</div>
          </div>

          <div className="">
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
