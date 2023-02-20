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
        <div className="sm:m-4 sm:mt-16 mb-4 flex justify-between sm:ml-32 sm:mr-32 ml-3 mr-3  mt-10">
          <select
            name="choice"
            id="choice"
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            onClick={() => {
              setSearchBox('');
            }}
            className="select-primary select sm:w-full sm:max-w-xs"
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
            className="input-bordered input-primary input sm:w-full sm:max-w-xs max-w-sm w-36 sm:placeholder:text-lg  placeholder:text-xs"
          />
        </div>

        <div className="mt-12  rounded-xl sm:ml-44 sm:mr-44 ml-3 mr-3 ">
          <div className="flex justify-around rounded-xl border  sm:tracking-widest sm:font-bold sm:text-xl border-info text-xs">
            <div className="flex flex-1 justify-center sm:p-6 p-5">USERNAME</div>
            <div className="flex flex-1 justify-center sm:p-6 p-5">FULL-NAME</div>
            <div className="flex flex-1 justify-center sm:p-6 p-5">ACTION</div>
          </div>

          <div className=" ">
            {searchBox.length > 0 && (
              <div>
                <div>
                  {filteredData?.map((item) => (
                    <BlockItem key={item.id} userData={item} />
                  ))}
                </div>
                <div>
                  {filteredData.length === 0 && (
                    <div className="flex justify-center p-12 text-2xl font-bold tracking-widest text-red-400">No Match Found</div>
                  )}
                </div>
              </div>
            )}

            {searchBox.length === 0 && selectedOption === 'all' && (
              <div>{allData?.map((data) => data.role !== 'moderator' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
            {searchBox.length === 0 && selectedOption === 'users' && (
              <div>{allData?.map((data) => data.role === 'user' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
            {searchBox.length === 0 && selectedOption === 'listers' && (
              <div className=''>{allData?.map((data) => data.role === 'lister' && <BlockItem key={data.id} userData={data} />)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
