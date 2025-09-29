import CertificateCard from "@/app/seller/profile/[id]/overview/certificate-card";
import EducationCard from "@/app/seller/profile/[id]/overview/education-card";
import ExperienceCard from "@/app/seller/profile/[id]/overview/experience-card";
import LanguageCard from "@/app/seller/profile/[id]/overview/language-card";
import React from "react";

const Overview = () => {
  return (
    <div className="grid grid-cols-12 gap-[16px]">
      {/* left box */}
      <div className="col-span-12 xl:col-span-5  rounded-[8px] bg-white border border-[#ECF1E7] overflow-hidden">
        {/* about me */}
        <div>
          <div className="border-b border-[#ECF1E7] min-h-[48px] grid place-items-center">
            <h3 className="font-[Roboto] text-[18px] font-medium text-[#0E0F19] ">
              About Me
            </h3>
          </div>

          <div className="p-[24px]">
            <p className="font-[Roboto] text-[16px] font-normal text-[#0E0F19] max-w-[422px]">
              Passionate about cricket and football️, following the legendary
              CR7 and the mighty Real Madrid
            </p>
            <div className="grid grid-cols-3">
              <div className="col-span-2 flex flex-col gap-y-[16px] mt-[44px]">
                <div className="flex flex-col gap-y-[4px]">
                  <p className="font-[Roboto] text-[12px] font-normal text-[#3E3F47]">
                    Member since
                  </p>

                  <h2 className="font-[Roboto] text-[20px] font-bold text-[#3E3F47] leading-none">
                    19 April 2022
                  </h2>
                </div>

                <div className="flex flex-col gap-y-[4px]">
                  <p className="font-[Roboto] text-[12px] font-normal text-[#3E3F47]">
                    Average response time
                  </p>

                  <h2 className="font-[Roboto] text-[20px] font-bold text-[#3E3F47] leading-none">
                    1 Hour
                  </h2>
                </div>

                <div className="flex flex-col gap-y-[4px]">
                  <p className="font-[Roboto] text-[12px] font-normal text-[#3E3F47]">
                    From
                  </p>

                  <h2 className="font-[Roboto] text-[20px] font-bold text-[#3E3F47] leading-none">
                    Bangladesh
                  </h2>
                </div>
              </div>
              <div className="col-span-1 bg-[#6392D8] rounded-[8px] grid place-items-center">
                <span className="font-[Roboto] font-bold text-[20px] text-[#F7F7FA]">
                  Contact
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* language */}

        <div>
          <div className="border min-h-[48px] border-[#ECF1E7] grid place-items-center">
            <span className="font-[Roboto] text-[18px] font-medium">
              Languages
            </span>
          </div>
          <div className="p-[24px] grid grid-cols-2 gap-[20px]">
            <LanguageCard title="english" level="beginner" />
            <LanguageCard title="bangla" level="native" />
            <LanguageCard title="hindi" level="advance" />
            <LanguageCard title="urdu" level="advance" />
          </div>
        </div>

        {/* certificates */}
        <div>
          <div className="border min-h-[48px] border-[#ECF1E7] grid place-items-center">
            <span className="font-[Roboto] text-[18px] font-medium">
              Certificates
            </span>
          </div>
          <div className="p-[24px] grid grid-cols-1 gap-[20px]">
            <CertificateCard
              title="Solution Architect"
              company="amazon"
              time="beginner"
            />

            <CertificateCard
              title="Solution Architect"
              company="amazon"
              time="beginner"
            />
          </div>
        </div>
      </div>
      {/* right box */}
      <div className="col-span-12 xl:col-span-7 rounded-[8px] bg-white border border-[#ECF1E7] overflow-hidden">
        {/* Desciption */}
        <div className="">
          <div className="border-b border-[#ECF1E7] min-h-[48px] grid place-items-center">
            <h3 className="font-[Roboto] text-[18px] font-medium text-[#0E0F19] ">
              Description
            </h3>
          </div>

          <p className="font-[Roboto] text-[14px] text-[#0E0F19] p-[24px]">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>

        {/* Experiences */}
        <div>
          <div className="border min-h-[48px] border-[#ECF1E7] grid place-items-center">
            <span className="font-[Roboto] text-[18px] font-medium">
              Experiences
            </span>
          </div>

          <div className="p-[24px] grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
            <ExperienceCard
              company="google"
              role="Fullstack developer"
              description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its "
            />
            <ExperienceCard
              company="google"
              role="Fullstack developer"
              description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its "
            />
          </div>
        </div>

        {/* Educations */}
        <div>
          <div className="border min-h-[48px] border-[#ECF1E7] grid place-items-center">
            <span className="font-[Roboto] text-[18px] font-medium">
              Educations
            </span>
          </div>

          <div className="p-[24px] grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
            <EducationCard
              major="BSC in CSE"
              institution="SouthEast University"
              location="Bangladesh"
            />

            <EducationCard
              major="HSC"
              institution="SouthEast University"
              location="Bangladesh"
            />
          </div>
        </div>

        {/* Skills*/}
        <div>
          <div className="border min-h-[48px] border-[#ECF1E7] grid place-items-center">
            <span className="font-[Roboto] text-[18px] font-medium">
              Skills
            </span>
          </div>

          <div className="p-[24px] flex flex-wrap gap-[20px]">
            <div className="capitalize rounded-[8px] px-[20px] py-[8px] bg-[#CFCFD1] text-[#3E3F47] font-medium font-[Roboto] text-[16px]">
              node js
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

// const seller = {
//   id: "21948eba-5caa-42df-a4b1-72bd5f259335",
//   fullName: "George Brekke I",
//   username: "test27",
//   email: "test27@gmail.com",
//   profilePicture:
//     "https://picsum.photos/seed/P5M6FuhL/1166/422?grayscale&blur=6",
//   description:
//     "Our horse-friendly Chips ensures monumental comfort for your pets",
//   profilePublicId: null,
//   oneliner: "emerge consequently depute bah knottily each comfortable",
//   country: "Central African Republic",
//   ratingCategories: {
//     one: {
//       count: 0,
//       value: 0,
//     },
//     two: {
//       count: 0,
//       value: 0,
//     },
//     five: {
//       count: 0,
//       value: 0,
//     },
//     four: {
//       count: 0,
//       value: 0,
//     },
//     three: {
//       count: 0,
//       value: 0,
//     },
//   },
//   responseTime: 0,
//   recentDelivery: null,
//   ongoingJobs: 0,
//   completedJobs: 0,
//   cancelledJobs: 0,
//   totalEarnings: 0,
//   totalGigs: 0,
//   ratingsCount: 0,
//   ratingSum: 0,
//   createdAt: "2025-09-17T05:49:39.299Z",
//   languages: [
//     {
//       id: "0337eed3-ac3b-476c-8371-171b5787247d",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       language: "Mandarin Chinese",
//       level: "Beginner",
//     },
//     {
//       id: "6d8f7af4-4672-4d2a-a53b-fe05de2bf488",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       language: "English",
//       level: "Native",
//     },
//     {
//       id: "59bcdf3a-dabd-447a-8b15-ad72de53fa54",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       language: "German",
//       level: "Basic",
//     },
//     {
//       id: "6a9f57d0-8aa1-428e-9c7d-923ff8ed3d43",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       language: "Spanish",
//       level: "Fluent",
//     },
//   ],
//   skills: [
//     {
//       id: "775f6a35-8457-4b9e-8dbe-d69a0ada08d3",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       name: "Python",
//     },
//     {
//       id: "607a38f4-84d4-4e8a-90bf-5cbc52d36280",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       name: "Data Analysis",
//     },
//     {
//       id: "e3968a19-4cb3-4d71-9201-f71f822f8fdd",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       name: "React.js",
//     },
//   ],
//   experience: [
//     {
//       id: "de4ebe74-138c-420b-ae91-a9098756cfda",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       company: "Global Marketing Solutions",
//       title: "Digital Marketing Specialist",
//       startDate: "2019-03-01",
//       endDate: "2021-12-31",
//       description:
//         "Managed SEO/SEM campaigns, social media strategy, and content creation for diverse clients. Achieved a 25% increase in lead generation.",
//       currentlyWorkingHere: false,
//     },
//   ],
//   education: [
//     {
//       id: "1a200ee7-c42b-42fe-8024-f8be001b5ffd",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       university: "Stanford University",
//       title: "Master of Science",
//       major: "Computer Science",
//       year: "2022",
//       country: "United States",
//     },
//   ],
//   socialLinks: [
//     {
//       id: "75dc095f-c143-40f9-a248-a17aff2eb012",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       platform: "GitHub",
//       link: "https://github.com/devmaster",
//     },
//     {
//       id: "96ead97f-bd9d-4910-964f-d6bf8f3edbd0",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       platform: "Twitter",
//       link: "https://twitter.com/janedoe_tech",
//     },
//   ],
//   certificates: [
//     {
//       id: "563e9d1a-b0ab-413a-915c-a36266b36e03",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       name: "Certified ScrumMaster (CSM)",
//       from: "Scrum Alliance",
//       year: "2023",
//     },
//     {
//       id: "4267b665-c349-458a-9c63-e10fb5618071",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       name: "CompTIA Security+",
//       from: "CompTIA",
//       year: "2019",
//     },
//     {
//       id: "9ff40db1-a3e7-4a94-b098-d146a4787552",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       name: "Project Management Professional (PMP)",
//       from: "Project Management Institute (PMI)",
//       year: "2020",
//     },
//     {
//       id: "be65b0f8-a9bd-4832-a2ce-11f3759abe24",
//       sellerId: "21948eba-5caa-42df-a4b1-72bd5f259335",
//       name: "Google Cloud Professional Data Engineer",
//       from: "Google Cloud",
//       year: "2022",
//     },
//   ],
// };

//   return (
//     <div className="bg-gray-100 min-h-screen flex justify-center">
//       <div className="w-full space-y-6">
//         {/* Languages, Skills, Experience, Education, Social Links, Certificates sections */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Languages */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//               <Globe className="mr-2 text-blue-500" />
//               Languages
//             </h2>
//             <ul className="space-y-3">
//               {seller.languages.length > 0 ? (
//                 seller.languages.map((lang, index) => (
//                   <li
//                     key={index}
//                     className="flex justify-between items-center text-gray-600"
//                   >
//                     <span className="font-medium">{lang.language}</span>
//                     <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                       {lang.level}
//                     </span>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-500 text-sm">No languages listed.</li>
//               )}
//             </ul>
//           </div>

//           {/* Skills */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//               <Star className="mr-2 text-yellow-500" />
//               Skills
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {seller.skills.length > 0 ? (
//                 seller.skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full hover:bg-gray-300 transition-colors"
//                   >
//                     {skill.name}
//                   </span>
//                 ))
//               ) : (
//                 <span className="text-gray-500 text-sm">No skills listed.</span>
//               )}
//             </div>
//           </div>

//           {/* Experience */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 md:col-span-2">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//               <Briefcase className="mr-2 text-purple-500" />
//               Experience
//             </h2>
//             <ul className="space-y-6">
//               {seller.experience.length > 0 ? (
//                 seller.experience.map((exp, index) => (
//                   <li key={index} className="pb-4 border-b last:border-b-0">
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {exp.title} at {exp.company}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {exp.startDate} -{" "}
//                       {exp.currentlyWorkingHere ? "Present" : exp.endDate}
//                     </p>
//                     <p className="mt-2 text-gray-600">{exp.description}</p>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-500 text-sm">
//                   No work experience listed.
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Education */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 md:col-span-2">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//               <GraduationCap className="mr-2 text-green-500" />
//               Education
//             </h2>
//             <ul className="space-y-4">
//               {seller.education.length > 0 ? (
//                 seller.education.map((edu, index) => (
//                   <li key={index} className="pb-3 border-b last:border-b-0">
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {edu.title} in {edu.major}
//                     </h3>
//                     <p className="text-gray-600 mt-1">
//                       {edu.university}, {edu.country} ({edu.year})
//                     </p>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-500 text-sm">No education listed.</li>
//               )}
//             </ul>
//           </div>

//           {/* Social Links */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//               <Link className="mr-2 text-teal-500" />
//               Social Links
//             </h2>
//             <ul className="space-y-3">
//               {seller.socialLinks.length > 0 ? (
//                 seller.socialLinks.map((link, index) => (
//                   <li key={index}>
//                     <a
//                       href={link.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center text-blue-600 hover:underline"
//                     >
//                       {link.platform}
//                     </a>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-500 text-sm">
//                   No social links listed.
//                 </li>
//               )}
//             </ul>
//           </div>

//           {/* Certificates */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//               <Award className="mr-2 text-orange-500" />
//               Certificates
//             </h2>
//             <ul className="space-y-4">
//               {seller.certificates.length > 0 ? (
//                 seller.certificates.map((cert, index) => (
//                   <li key={index}>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {cert.name}
//                     </h3>
//                     <p className="text-gray-600 mt-1 text-sm">
//                       From {cert.from} ({cert.year})
//                     </p>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-500 text-sm">
//                   No certificates listed.
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
