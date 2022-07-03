import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Todo} from "../../types/Todo";

// typeScript reference: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#createapi
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => `/todos`,
            transformResponse: (res: Todo[]) => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation<void, Omit<Todo, "id">>({
            query: (todo: Omit<Todo, "id">) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation<void, Todo>({
            query: (todo: Todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation<void, Pick<Todo, "id">>({
            query: ({id}: Pick<Todo, "id">) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos'],
        }),
    }),
});
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;