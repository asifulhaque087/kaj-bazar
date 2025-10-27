const OrderTable = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full rounded-[8px] overflow-hidden bg-[#FEFEFF] min-w-[800px]">
        <thead className="bg-[#616BA4] ">
          <tr className="">
            {[...Array(6)].map((item, index) => (
              <th
                key={index}
                className="uppercase min-h-[44px] font-roboto text-xs font-semibold text-[#F7F7FA] py-[16px] whitespace-nowrap"
              >
                Gig Image
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {[...Array(5)].map((item, index) => (
              <td
                key={index}
                className="font-roboto text-sm text-[#3E3F47] text-center h-19 whitespace-nowrap"
              >
                Gig Image
              </td>
            ))}
            <td className="font-roboto text-sm text-[#3E3F47] text-center  h-20">
              <img
                src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/248347534/original/3f3a487e81848f53a40be787069783efb31ea61e/create-attractive-gig-image-e1fd.jpg"
                alt="Gig thumbnail"
                className="w-16 h-12 object-cover rounded-md mx-auto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
