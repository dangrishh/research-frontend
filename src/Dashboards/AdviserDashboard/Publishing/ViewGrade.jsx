// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
// import { LoadingOutlined } from '@ant-design/icons';


// export default function GradingTable({ userId }) {
//   const [rubrics, setRubrics] = useState([]); // All rubrics
//   const [selectedRubricId, setSelectedRubricId] = useState(null); // Selected rubricId
//   const [categories, setCategories] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [title, setTitle] = useState('');
//   const [panelists, setPanelists] = useState([]);
//   const [selectedPanelist, setSelectedPanelist] = useState(null);
//   const [gradeLabels, setGradeLabels] = useState({});
//   const [gradesData, setGradesData] = useState([]);
//   const [gradeSummary, setGradeSummary] = useState(null);
//   const [finalGradeData, setFinalGradeData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user'));

//   // Fetch grades and initialize rubrics
//   useEffect(() => {
//     const fetchGrades = async () => {
//       try {
//         const response = await axios.get(
//           `https://researchtree-backend-heroku-1f677bc802ae.herokuapp.com/api/student/fetch-student/grades/${user._id}`
//         );
//         const gradesData = response.data;

//         if (gradesData.length > 0) {
//           // Extract unique rubrics
//           const uniqueRubrics = Array.from(
//             new Set(gradesData.map((g) => g.rubricId?._id))
//           ).map((id) => gradesData.find((g) => g.rubricId?._id === id).rubricId);

//           setRubrics(uniqueRubrics);
//           setGradesData(gradesData);

//           // Set the first rubric as selected by default
//           if (uniqueRubrics.length > 0) {
//             setSelectedRubricId(uniqueRubrics[0]._id);
//           }
//         } else {
//           console.warn('No grades data found for the user.');
//         }
//       } catch (error) {
//         console.error('Error fetching grades:', error);
//       }
//     };

//     fetchGrades();
//   }, [user._id]);

//   // Update categories, grade labels, and panelists when a rubric is selected
//   useEffect(() => {
//     if (selectedRubricId && gradesData.length > 0) {
//       const rubricGrades = gradesData.filter(
//         (grade) => grade.rubricId?._id === selectedRubricId
//       );

//       if (rubricGrades.length > 0) {
//         const rubric = rubricGrades[0].rubricId || {};
//         setTitle(rubric.title || 'No Title');

//         const parsedCategories = rubric.criteria?.map((c) => c.category) || [];
//         setCategories(parsedCategories);

//         const parsedGradeLabels = rubric.criteria?.reduce((acc, c) => {
//           acc[c.category] = c.gradeLabels || {};
//           return acc;
//         }, {}) || {};
//         setGradeLabels(parsedGradeLabels);

//         const panelistIds = rubricGrades.map((g) => g.panelistId);
//         setPanelists(panelistIds);

//         // Pre-select the first panelist
//         if (panelistIds.length > 0) {
//           handlePanelistClick(panelistIds[0]._id, rubricGrades);
//         }
//       } else {
//         console.warn('No grades found for selected rubric:', selectedRubricId);
//       }
//     }
//   }, [selectedRubricId, gradesData]);

//   // Handle panelist selection and update grades
//   const handlePanelistClick = (panelistId, rubricGrades) => {
//     setSelectedPanelist(panelistId);

//     const panelistGrades = rubricGrades.find(
//       (g) => g.panelistId?._id === panelistId
//     );

//     if (panelistGrades?.grades?.length) {
//       setGrades(panelistGrades.grades);
//       setGradeSummary({
//         totalGradeValue: panelistGrades.totalGradeValue,
//         overallGradeLabel: panelistGrades.overallGradeLabel,
//         gradedAt: panelistGrades.gradedAt,
//       });
//     } else {
//       // Reset grade summary if no grades available for the panelist
//       setGradeSummary(null);
//       console.warn('No grades available for panelist:', panelistId);
//     }
//   };

//   // // Fetch final grade
//   // const fetchFinalGrade = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `https://researchtree-backend-heroku-1f677bc802ae.herokuapp.com/api/student/fetch-student/FinalGrades/${user._id}`
//   //     );
//   //     setFinalGradeData(response.data);
//   //     setIsModalOpen(true);
//   //   } catch (error) {
//   //     console.error('Error fetching final grade:', error);
//   //   }
//   // };

//   const fetchFinalGrade = async () => {
//     try {
//       const response = await axios.get(
//         `https://researchtree-backend-heroku-1f677bc802ae.herokuapp.com/api/student/fetch-student/FinalGrades/${user._id}/${selectedRubricId}` // Include selectedRubricId in the endpoint
//       );
//       setFinalGradeData(response.data);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error('Error fetching final grade:', error);
//     }
//   };


//   const gradeColors = {
//     excellent: 'bg-green-500',
//     good: 'bg-blue-500',
//     satisfactory: 'bg-yellow-500',
//     needsImprovement: 'bg-red-500',
//   };
  

//   // // Calculate Final Grade based on Rubrics and Panelists
//   // const calculateFinalGrade = () => {
//   //   if (!gradesData || gradesData.length === 0) return 0;

//   //   const rubricGrades = gradesData.filter(
//   //     (grade) => grade.rubricId?._id === selectedRubricId
//   //   );

//   //   const total = rubricGrades.reduce((acc, grade) => {
//   //     const panelGrade = grade.grades?.reduce((sum, g) => sum + g.value, 0) || 0;
//   //     return acc + panelGrade;
//   //   }, 0);

//   //   const totalPanelists = rubricGrades.length;
//   //   const averageGrade = total / totalPanelists;

//   //   return averageGrade;
//   // };

//   return (
//     <div className="text-[14px] p-4 w-[1400px] h-auto ml-[400px] mt-[380px]">
//       {/* Rubric Selector */}
    

//       {/* Rubric Title */}
//       {/* <h2 className="">
//       <img className="inline-block mr-2 mb-1" src="/src/assets/gradingResult.png" alt="My Manuscript" />{""}
//       </h2> */}

//       {/* Panelist Buttons */}
//       <div className="flex justify-center mb-4">
//         {panelists.map((panelist) => (
//           <button
//             key={panelist._id}
//             className={`px-4 py-2 m-2 text-white rounded ${
//               selectedPanelist === panelist._id ? 'bg-[#4B4B4B]' : 'bg-[#2B2B2B]'
//             }`}
//             onClick={() => handlePanelistClick(panelist._id, gradesData)}
//           >
//             {panelist.name}
//           </button>
//         ))}
        
//         <button
//           className="bg-blue-600 text-white px-4 py-2 m-2 rounded"
//           onClick={fetchFinalGrade}
//         >
//           Final Grade
//         </button>
//       </div>

//       <div className="flex justify-center mb-4">
//         {rubrics.map((rubric) => (
//           <button
//             key={rubric._id}
//             className={`h-[50px] w-[1500px] text-[20px] m-2 text-white rounded ${
//               selectedRubricId === rubric._id ? 'bg-[#4B4B4B]' : 'bg-[#2B2B2B]'
//             }`}
//             onClick={() => setSelectedRubricId(rubric._id)}
//           >
//             {rubric.title}
//           </button>
//         ))}
//       </div>


//       <div className="grid grid-cols-5 gap-2 text-white text-center mt-4">
//   <div className="bg-[#575757] font-bold p-4">Criterion</div>
//   {['4', '3', '2', '1'].map((score) => {
//     const labelColor = {
//       '4': 'bg-green-500', // Excellent
//       '3': 'bg-blue-500', // Good
//       '2': 'bg-yellow-500', // Satisfactory
//       '1': 'bg-red-500', // Needs Improvement
//     }[score];

//     return (
//       <div key={score} className={`p-4 font-bold ${labelColor}`}>
//         {score}
//       </div>
//     );
//   })}

//   {categories.map((category) => {
//     const panelistGrade = grades.find(
//       (grade) => grade.criterion === category
//     );

//     return (
//       <React.Fragment key={category}>
//         <div className="bg-[#2B2B2B] text-[25px] font-bold p-4 capitalize">
//           {category}
//         </div>
//         {['4', '3', '2', '1'].map((score) => {
//           const gradeLabel = {
//             '4': 'excellent',
//             '3': 'good',
//             '2': 'satisfactory',
//             '1': 'needsImprovement',
//           }[score];

//           const gradeColor =
//             panelistGrade && panelistGrade.gradeValue === parseInt(score)
//               ? gradeColors[gradeLabel] || 'bg-gray-600'
//               : 'bg-gray-600';

//           return (
//             <div key={score} className={`p-4 ${gradeColor}`}>
//               {gradeLabels[category] && gradeLabels[category][gradeLabel]
//                 ? gradeLabels[category][gradeLabel]
//                 : 'N/A'}
//             </div>
//           );
//         })}
//       </React.Fragment>
//     );
//   })}
// </div>


//       {/* Display Grade Summary */}
//       {gradeSummary && (
//        <div className="text-white mt-4 p-4 bg-[#2B2B2B] rounded flex flex-col items-center justify-center text-center">
//        <h3 className="text-[20px] font-bold mb-2">Grade Summary</h3>
//        <p className="text-[16px]">Total Grade: {gradeSummary.totalGradeValue}</p>
//        <p className="text-[16px]">Overall Grade: {gradeSummary.overallGradeLabel}</p>
//        <p className="text-[14px]">Graded At: {new Date(gradeSummary.gradedAt).toLocaleString()}</p>

   
//       </div>
      
//       )}

// {/* Final Grade Modal */}
// <Dialog
//   open={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   fullWidth
//   maxWidth="sm"
// >
//   <DialogTitle>Final Grade</DialogTitle>
//   <DialogContent>
//     {finalGradeData ? (
//       <>
//         <Typography>
//           <strong>Student:</strong> {finalGradeData.student.name}
//         </Typography>
//         {finalGradeData.rubrics.map((rubric) => (
//           <div key={rubric.rubricId} className="mb-2">
//             <Typography variant="h6">{rubric.rubricTitle}</Typography>
//             <Typography>
//               Final Grade: {rubric.totalGradeValue} ({rubric.overallGradeLabel})
//             </Typography>
//           </div>
//         ))}
//       </>
//     ) : (
//       <Typography>No final grade data available.</Typography>
//     )}
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setIsModalOpen(false)} color="primary">
//       Close
//     </Button>
//   </DialogActions>
// </Dialog>

//     </div>
//   );
// }
