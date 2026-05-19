const BASE_URL: string = "http://localhost:3001";
const bacend_URL: string = "http://localhost:5001/api/student";
type ApiEndpoints = {
  empList: any;
  student:any;
  studentList: any;
  classList: any;
  feesList: any;
  transportList: any;
  expensesList: any;
  userList: any;
  blogCard: any;
};

export const api: ApiEndpoints = {
  empList: `${BASE_URL}/emp_list`,
  studentList: `${BASE_URL}/student_list`,
  student: `${bacend_URL}/student`,
  classList: `${BASE_URL}/class_list`,
  feesList: `${BASE_URL}/fees_list`,
  transportList: `${BASE_URL}/transport_list`,
  expensesList: `${BASE_URL}/expenses_list`,
  userList: `${BASE_URL}/user_list`,
  blogCard: `${BASE_URL}/blogCard`,
};