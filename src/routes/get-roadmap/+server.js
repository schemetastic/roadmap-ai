import { json } from '@sveltejs/kit';
import { roadmapFields } from '$lib/roadmap-options.js';
import { env } from '$env/dynamic/private';
import OpenAI from "openai";

export async function GET(params) {
    let hasError = false;
    let token = env.GITHUB_TOKEN;
    const endpoint = "https://models.inference.ai.azure.com";
    const modelName = "gpt-4o-mini";


    const field = params.url.searchParams.get('field');
    const fieldTitle = roadmapFields[field];
    const prompt = `Can you create a roadmap of exactly 12 steps for becoming a ${fieldTitle}, each step can be from 1-5 words and also include a description of the step and meaning in about 20-25 words, each step should follow this format: {! $STEP: step-here $DESCRIPTION: description-here /}. (DO NOT INCLUDE ANYTHING ELSE IN THE RESPONSE)`

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName
    });


    const roadmapContent = parseRoadmap(response.choices[0].message.content);

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
