import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Student {
  id: number;
  fname: string;
  lname: string;
  gender: string;
  phone: string;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3001/emp_list";


// ✅ FETCH
export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// ✅ ADD
export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (student: Omit<Student, "id">) => {
    const response = await axios.post(API_URL, student);
    return response.data;
  }
);

// ✅ UPDATE
export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (student: Student) => {
    const response = await axios.put(
      `${API_URL}/${student.id}`,
      student
    );
    return response.data; // VERY IMPORTANT
  }
);

// ✅ DELETE
export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.loading = false;
      })

      // ADD
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })

      // UPDATE
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateStudent.rejected, (state) => {
        state.loading = false;
      })

      // DELETE
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (s) => s.id !== action.payload
        );
      });
  },
});

export default studentSlice.reducer;
