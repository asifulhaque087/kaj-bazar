
"use client"

interface IColumn {
  name: string;
  selector: (row: any) => any;
}

export interface INormalTable {
  columns: IColumn[];
  tableData: any;
}


export const OrderTable = ({ columns, tableData }: INormalTable) => {
  return (
    <div>
      <table className="border-collapse text-[14px] rounded-t-[5px] overflow-hidden w-full block px-[20px] sm:table sm:px-0 bg-white">
        <thead className="hidden sm:table-header-group">
          <tr className="text-left  bg-indigo-500 text-white font-[700]">
            {columns.map((column) => (
              <th className="py-[12px] px-[15px]" key={column.name}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block sm:table-row-group">
          {tableData.map((row: any, i: number) => (
            <tr
              key={i}
              className="my-[30px]  block sm:table-row text-right sm:text-left  shadow-custom sm:shadow-none rounded sm:rounded-none  border-t-2 border-indigo-600 sm:border-t-0 sm:border-b sm:border-b-slate-200 sm:last:border-0"
            >
              {columns.map((column, columnIndex) => (
                <td
                  className="py-[12px] px-[15px] block sm:table-cell relative bg-green-5000 border-b last:border-0 sm:border-0"
                  key={columnIndex}
                  data-label={column.name}
                >
                  {column.selector(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// const OrderTable = () => {
//   return (
//     <div className="overflow-x-auto w-full">
//       <table className="w-full rounded-[8px] overflow-hidden bg-[#FEFEFF] min-w-[800px]">
//         <thead className="bg-[#616BA4] ">
//           <tr className="">
//             {[...Array(6)].map((item, index) => (
//               <th
//                 key={index}
//                 className="uppercase min-h-[44px] font-roboto text-xs font-semibold text-[#F7F7FA] py-[16px] whitespace-nowrap"
//               >
//                 Gig Image
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             {[...Array(5)].map((item, index) => (
//               <td
//                 key={index}
//                 className="font-roboto text-sm text-[#3E3F47] text-center h-19 whitespace-nowrap"
//               >
//                 Gig Image
//               </td>
//             ))}
//             <td className="font-roboto text-sm text-[#3E3F47] text-center  h-20">
//               <img
//                 src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/248347534/original/3f3a487e81848f53a40be787069783efb31ea61e/create-attractive-gig-image-e1fd.jpg"
//                 alt="Gig thumbnail"
//                 className="w-16 h-12 object-cover rounded-md mx-auto"
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default OrderTable;
