import React, { useEffect, useState } from 'react'

const History = () => {
  const token = localStorage.getItem("token");
  const [buyrutmalarData, setBuyrutmalarData] = useState([])
  const [loading, setLoading] = useState(true)

  
  const getBuyrutmaLar = () => {
  
    fetch("https://u-dev.uz/api/bookings/booking/his", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((item) => {
        setBuyrutmalarData(item?.content);
        setLoading(false)
      });
  }
  
  useEffect(()=>{
    getBuyrutmaLar()
  },[])

  if(loading){
    return <h1>Loading...</h1>
  }
 
    return (
      <>
        <div className=" relative flex flex-col w-full h-full  text-gray-700 bg-white ">
          {
            buyrutmalarData.length === 0 ? <h1 className='text-center text-3xl font-bold leading-[75vh]'>Buyrutmalar mavjud emas!!!</h1> : 
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Foydalanuvchi
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Ishchi
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  bookingTime
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Status
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Tarif
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Box Nomi
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Box Turi
                  </p>
                </th>

                {/* <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Amallar
                  </p>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {buyrutmalarData?.map((el, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.boxName}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.workerName}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.bookingTime.split("T")[0]}
                    </p>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.bookingTime.split("T")[1].split(".")[0]}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.status}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.tariffName}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.tariffName}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {el?.boxType}
                    </p>
                  </td>
                  {/* <td className="p-4 border-b border-blue-gray-50">
                    <CiEdit
                      onClick={() => {
                        setEditBuyrutmaId(el);
                      }}
                      style={{ display: "inline-block", cursor: "pointer" }}
                      size={25}
                    />
                    <MdDeleteOutline
                      // onClick={() => tarifOchirish(el?.id)}
                      style={{
                        display: "inline-block",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                      size={25}
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          }
        </div>
      </>
    );
}

export default History