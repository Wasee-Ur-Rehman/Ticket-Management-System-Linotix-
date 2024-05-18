
// import React, { useState } from 'react';

// function Ticket({ formData, ticketNo }) {
//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//         Ticket Details
//       </div>
//       <div className="py-4 px-6">
//         <p>Name: {formData.name}</p>
//         <p>Email: {formData.email}</p>
//         <p>Phone: {formData.phone}</p>
//         <p>Date: {formData.date}</p>
//         <p>Time: {formData.time}</p>
//         <p>Start Destination: {formData.startDestination}</p>
//         <p>End Destination: {formData.endDestination}</p>
//         <p>Ticket Number: {ticketNo}</p>
//       </div>
//     </div>
//   );
// }

// export const AppointmentForm= () =>  {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     date: '',
//     time: '',
//     service: '',
//     message: '',
//     startDestination: '',
//     endDestination: ''
//   });

//   const [ticketNo, setTicketNo] = useState('');
//   const [showTicket, setShowTicket] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Generate ticket number (you can implement your own logic here)
//     const newTicketNo = Math.floor(Math.random() * 1000) + 1;
//     setTicketNo(newTicketNo);
//     setShowTicket(true);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       {!showTicket ? (
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
//             Book an Appointment
//           </div>
//           <form className="py-4 px-6" onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
//                 Name
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="name"
//                 type="text"
//                 placeholder="Enter name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
             


                
                          
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="email"
//             type="email"
//             placeholder="Enter  email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
      


//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
//              Phone
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="phone"
//             type="tel"
//             placeholder="Enter  phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>



//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
//              Date
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="date"
//             type="date"
//             placeholder="Enter  Date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
//              Time
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="time"
//             type="time"
//             placeholder="Enter  Time"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//           />
//         </div>



//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="startDestination">
//             Start Destination
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="startDestination"
//             type="text"
//             placeholder="Enter start destination"
//             name="startDestination"
//             value={formData.startDestination}
//             onChange={handleChange}
//           />
//         </div>
       
//         <div className="mb-4">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="endDestination">
//              End Destination
//            </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="endDestination"
//             type="text"
//             placeholder="Enter endDestination "
//             name="endDestination"
//             value={formData.endDestination}
//             onChange={handleChange}
//           />
//         </div>
             




//             <div className="flex items-center justify-center mb-4">
//               <button
//                 className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
//                 type="submit"
//               >
//                 Book Appointment
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <Ticket formData={formData} ticketNo={ticketNo} />
//       )}
//     </div>
//   );
// }

// export default AppointmentForm; 
