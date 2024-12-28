import { Legend, plugins } from "chart.js";

// export const data = {
//     labels: ['Free', 'Used'],
//     datasets: [
//       {
//         backgroundColor: ['#ef621b', '#BE5825'],
//         data: [40, 20]
//       }
//     ],
//     Options: {
//       plugins: {
//         Legend: {
//           display: true,
//           labels: {
//             font: {
//               size: 12,
//             },
//           },
//           position: 'right',
//         }
//       }
//     }
//   }
  
export const data = {
  labels: ['Free', 'Used'],
  datasets: [
    {
      backgroundColor: ['#072E2D', '#42997C'],
      data: [80, 20]
    }
  ]
};

export const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        font: {
          size: 100,
        },
      },
      position: 'right', 
    }
  }
};
