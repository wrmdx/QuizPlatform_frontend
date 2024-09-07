import {apiSlice} from "@/services/api/apiSlice.jsx";

export const skillsApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => `/admin/skills`,
            providesTags: ['Skills'],
        }),
        addSkill : builder.mutation({
            query: (body) => ({
                url: `/admin/skills/`,
                method: 'POST',
                body : body
            }),
            invalidatesTags: ['Skills'],
        }),
    })

})

export const {useGetSkillsQuery, useAddSkillMutation} = skillsApiSlice ;