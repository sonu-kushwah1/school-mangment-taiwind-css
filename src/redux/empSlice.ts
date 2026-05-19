import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Employee {
  id: any;
  fname: string;
  lname: string;
  gender: string;
  phone: string;
  email: string;
  department: string;
  designation: string;
  salary: string;
  address: string;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3001/emp_list";


// ✅ FETCH
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// ✅ ADD
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee: Omit<Employee, "id">) => {
    const response = await axios.post(API_URL, employee);
    return response.data;
  }
);

// ✅ UPDATE
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee: Employee) => {
    const response = await axios.put(
      `${API_URL}/${employee.id}`,
      employee
    );
    return response.data; // VERY IMPORTANT
  }
);

// ✅ DELETE
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: any) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      })

      // ADD
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      // UPDATE
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (e) => e.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.loading = false;
      })

      // DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (e) => e.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
