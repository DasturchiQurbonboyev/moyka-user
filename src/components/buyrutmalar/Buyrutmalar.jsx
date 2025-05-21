import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Buyrutmalar = () => {
  const token = localStorage.getItem("token");

  const [buyrutmalarData, setBuyrutmalarData] = useState([]);
  const [tarifData, setTarifData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [createBuyrutma, setCreateBuyrutma] = useState(false);
  const [editBuyrutmaId, setEditBuyrutmaId] = useState(false);

  const [boxId, setBoxId] = useState();
  const [tarifId, setTarifId] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const [loadingBtn, setLoadingBtn] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const handleEditBuyrutma = async (id) => {
    setLoadingBtn(id);  // faqat shu id loadingga o‘tadi
    try {
      await editBuyrutma(id);  // async funksiya deb faraz qilamiz
      toast.success("Buyurtma o'chirildi!");
    } catch (error) {
      toast.error("Xatolik yuz berdi!");
    } finally {
      setLoadingBtn(null);  // loading tugadi
    }
  };

  useEffect(() => {
    if (!selectedDate) return;

    const today = new Date();
    const selected = new Date(selectedDate);

    // Faqat sanasi bo‘yicha taqqoslaymiz (soat e'tiborsiz)
    const isToday =
      today.getFullYear() === selected.getFullYear() &&
      today.getMonth() === selected.getMonth() &&
      today.getDate() === selected.getDate();

    if (isToday) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();

      const filtered = vaqtlar.filter((time) => {
        const [hour, minute] = time.split(":").map(Number);

        return (
          hour > currentHour || (hour === currentHour && minute > currentMinute)
        );
      });

      setAvailableTimes(filtered);
    } else {
      setAvailableTimes(vaqtlar);
    }
  }, [selectedDate]);

  console.log(editBuyrutmaId, "editBuyrutmaId");

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    setMinDate(`${year}-${month}-${day}`);
  }, []);

  let vaqtlar = [];
  let h = 0;

  for (let i = 0; i < 24; i++) {
    if (h < 10) {
      h = "0" + h;
      vaqtlar.push(h + ":00");
      vaqtlar.push(h + ":30");
      h = +h + 1;
    } else {
      vaqtlar.push(h + ":00");
      vaqtlar.push(h + ":30");
      h = +h + 1;
    }
  }

  const getBuyrutmaLar = () => {
    fetch("http://45.154.2.116:7010/api/bookings/booking", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((item) => {
        setLoading(false)
        setBuyrutmalarData(item?.content);
      });
  };

  const getTarifData = () => {
    fetch("http://45.154.2.116:7010/api/users/tariffs", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((item) => {
        setTarifData(item);
      });
  };

  const getBoxData = () => {
    fetch("http://45.154.2.116:7010/api/users/boxes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((item) => {
        setBoxData(item);
      });
  };

  const createBuyrutmaItem = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://45.154.2.116:7010/api/users/booking",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            boxId: +boxId,
            tariffId: +tarifId,
            bookingTime: `${selectedDate}T${bookingTime}:00.000`,
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.log("❌ Xatolik javobi:", errText);
        throw new Error(`Status: ${response.status}, Xabar: ${errText}`);
      }

      const text = await response.text();

      let item = null;
      try {
        item = text ? JSON.parse(text) : null;
      } catch (e) {
        console.warn("JSON parse xatolik, javob matn:", text);
      }

      console.log("✅ Yuborildi:", item);

      getBuyrutmaLar();
      toast.success("Buyurtma qo‘shildi!");
      setCreateBuyrutma(false);
    } catch (error) {
      console.error("🚨 Xatolik:", error);
      toast.error("Xatolik: " + error.message);
    }
  };

  const editBuyrutma = async (id) => {
    try {
      const response = await fetch(
        `http://45.154.2.116:7010/api/users/booking/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Status: ${response.status}, Xabar: ${errText}`);
      }

      const text = await response.text();

      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        console.warn("JSON parse error, server javobi:", text);
      }

      getBuyrutmaLar();
      setLoadingBtn(null);
      toast.success("Buyurtma yangilandi!");
      setEditBuyrutmaId(null);
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Xatolik: " + error.message);
    }
  };

  useEffect(() => {
    getBuyrutmaLar();
  }, []);

  useEffect(() => {
    getTarifData();
    getBoxData();
  }, [createBuyrutma]);


  if(loading) return <h1>Loading...</h1>

  return (
    <>
      <div className=" relative flex flex-col w-full h-full  text-gray-700 bg-white ">
        {(editBuyrutmaId || createBuyrutma) && (
          <div
            style={{ padding: "20px" }}
            className="fixed w-[100%] z-[50000] bg-[rgba(0,0,0,0.5)] h-[100vh] w-100 top-0 left-0 "
          >
            <form
              onSubmit={editBuyrutmaId ? editBuyrutmalar : createBuyrutmaItem}
              style={{ padding: "20px" }}
              className="max-w-[600px] absolute w-100 bg-white  rounded-xl top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
            >
              <label
                style={{ marginBlock: "8px", display: "block" }}
                htmlFor=""
              >
                Box nomi
              </label>
              <select
                value={boxId}
                onChange={(e) => setBoxId(e.target.value)}
                style={{ padding: "8px 10px" }}
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {boxData?.map((item, index) => (
                  <option value={item?.id}>{item?.name}</option>
                ))}
              </select>
              <label
                style={{ marginBlock: "8px", display: "block" }}
                htmlFor=""
              >
                Tarif
              </label>
              <select
                value={tarifId}
                onChange={(e) => setTarifId(e.target.value)}
                style={{ padding: "8px 10px" }}
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {tarifData?.map((item, index) => (
                  <option value={+item?.id}>{item?.name}</option>
                ))}
              </select>
              <label
                style={{ marginBlock: "8px", display: "block" }}
                htmlFor=""
              >
                Sana
              </label>
              <div>
                <input
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  type="date"
                  min={minDate} // O‘tgan sanalarni tanlashni taqiqlaydi
                  style={{ padding: "8px 10px" }}
                  className="outline-none border w-full rounded"
                />
              </div>

              <label
                style={{ marginBlock: "8px", display: "block" }}
                htmlFor=""
              >
                Vaqti
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                style={{ padding: "8px 10px" }}
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[5px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {availableTimes?.map((item, index) => (
                  <option value={item}>{item}</option>
                ))}
              </select>

              <div
                style={{
                  marginBlock: "15px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => {
                    setEditBuyrutmaId(false);
                    setCreateBuyrutma(false);
                  }}
                  style={{ padding: "10px 20px" }}
                  type="button"
                  class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Bekor qilish
                </button>
                <button
                  style={{ padding: "10px 20px" }}
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {editBuyrutmaId ? "Tarifni o'zgartirish" : "Tarif qo'shish"}
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => setCreateBuyrutma(true)}
            type="button"
            style={{
              paddingInline: "20px",
              paddingBlock: "10px",
              marginBlock: "10px",
            }}
            className="px-5 py-2.5 cursor-pointer me-2 mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Buyrutma qo'shish
          </button>
        </div>
        {buyrutmalarData.length === 0 ? (
          <h1
            className="text-center text-3xl font-bold leading-[75vh]"
          >
            Buyrutmalar mavjud emas!!!
          </h1>
        ) : (
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

                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Amallar
                  </p>
                </th>
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
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      style={{ padding: "5px 10px" }}
                      onClick={() => {
                        editBuyrutma(el?.id)
                      }}
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                    Buyrutmani bekor qilish
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Buyrutmalar;
