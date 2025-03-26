// "use client";
// import { useEffect, useState } from "react";

// export function useRole() {
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch role from API, session, or localStorage
//     const userRole = localStorage.getItem("role") || "viewer"; // Default to 'viewer'
//     setRole(userRole);
//   }, []);

//   return role;
// }
