import { json } from '@sveltejs/kit';
import { roadmapFields } from '$lib/roadmap-options.js';
import { env } from '$env/dynamic/private';
import OpenAI from "openai";

export async function GET(params) {
    let hasError = false;
    let token = env.GITHUB_TOKEN;
    const endpoint = "https://models.inference.ai.azure.com";
    const modelName = "gpt-4o-mini";

    const tempPrompt = `Sure! Here’s a step-by-step roadmap for becoming a UI/UX developer:

    {! $STEP: Learn Design Principles $DESCRIPTION: Understand the fundamentals of design, including color theory, typography, and layout to create visually appealing and functional interfaces. /}

    {! $STEP: Study User Research $DESCRIPTION: Explore different research methods to gather insights about users' needs, behaviors, and preferences, which guide the design process effectively. /}

    {! $STEP: Master Wireframing Tools $DESCRIPTION: Become proficient in wireframing software like Sketch, Figma, or Adobe XD to create low-fidelity prototypes for initial design concepts. /}

    {! $STEP: Create Prototypes $DESCRIPTION: Develop interactive prototypes that simulate user experiences, allowing you to test design ideas and gather feedback before final implementation. /}

    {! $STEP: Understand Information Architecture $DESCRIPTION: Focus on organizing and structuring content effectively, ensuring users can navigate applications easily and find information without frustration. /}

    {! $STEP: Learn HTML/CSS Basics $DESCRIPTION: Acquire fundamental coding skills in HTML and CSS, enabling you to communicate effectively with developers and understand front-end constraints. /}

    {! $STEP: Gain Experience with Usability Testing $DESCRIPTION: Conduct usability tests with real users to evaluate design effectiveness, identifying pain points and areas of improvement in your designs. /}

    {! $STEP: Study Accessibility Standards $DESCRIPTION: Familiarize yourself with web accessibility guidelines to ensure designs are usable for all individuals, including those with disabilities. /}

    {! $STEP: Build a Portfolio $DESCRIPTION: Create a diverse portfolio showcasing your design projects, methodologies, and final outcomes to demonstrate your skills to potential employers. /}

    {! $STEP: Network with Professionals $DESCRIPTION: Connect with other UI/UX designers and industry professionals through events, social media, or forums to gain insights and opportunities. /}

    {! $STEP: Stay Updated on Trends $DESCRIPTION: Regularly follow design blogs, podcasts, and social media to remain informed about the latest UI/UX trends and best practices. /}

    {! $STEP: Apply for Internships $DESCRIPTION: Seek internships or entry-level positions to gain hands-on experience, allowing you to apply your skills and learn in a professional environment. /}

This roadmap outlines a pathway for emerging UI/UX developers to build crucial skills and knowledge in the field.
`
    const field = params.url.searchParams.get('field');
    const fieldTitle = roadmapFields[field];
    const prompt = `Can you create a roadmap of exactly 12 steps for becoming a ${fieldTitle}, each step can be from 1-5 words and also include a description of the step and meaning in about 20-25 words, each step should follow this format: {! $STEP: step-name-here $DESCRIPTION: description-here /}. (DO NOT INCLUDE ANYTHING ELSE IN THE RESPONSE)`

    /*const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName
    });*/


    const roadmapContent = parseRoadmap(tempPrompt);
    // const roadmapContent = parseRoadmap(response.choices[0].message.content);

    if (roadmapContent.length < 12) {
        hasError = true;
    }

    return json({ data: roadmapContent, hasError: hasError });

}

function parseRoadmap(roadmapString) {
    const steps = [];
    const regex = /\{\!\s*\$STEP:\s*(.*?)\s*\$DESCRIPTION:\s*(.*?)\s*\/\}/g;
    let match;

    while ((match = regex.exec(roadmapString)) !== null) {
        steps.push({
            step: match[1].trim(),
            description: match[2].trim()
        });
    }

    return steps;
}
