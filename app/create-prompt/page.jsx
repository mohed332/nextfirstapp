'use client'
import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt: "",
        tag: ""
    });


    const createPrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true)

        try {
            const res = await fetch('/api/prompt/new', 
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if (res.ok) {
                console.log('Post created');
                router.push('/')
            }

        } catch (error) {
            console.log(error);
        }finally {
            setsubmitting(false);
        }
    } 

return (
    <>
        <Form
        type= "Create"
        post={post}
        setPost = {setpost}
        submitting= {submitting}
        handleSubmit={createPrompt}
            
        />
    </>
)
}

export default CreatePrompt;