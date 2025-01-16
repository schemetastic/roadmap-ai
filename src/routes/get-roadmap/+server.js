import { json } from '@sveltejs/kit';

export function GET(params) {
    let hasError = false;

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

    const content = parseRoadmap(tempPrompt);

    if (content.length < 12) {
        hasError = true;
    }

    return json({ data: content, hasError: hasError });

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
