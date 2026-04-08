import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Me</h1>

      <div className="space-y-5 text-lg leading-relaxed text-gray-700">
        <p>Hello! I’m Kanishk Banker, a tech enthusiast and writer.</p>

        <p>
          I created this blog to share my thoughts, discuss ideas, and reflect on things I enjoy, like art, technology,
          and life in general. I hope that my words resonate with you and maybe inspire you in some way.
        </p>

        <p>In my free time, I enjoy:</p>

        <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
          <li>Exploring new technologies and projects</li>
          <li>Reading and reflecting on thought-provoking topics</li>
          <li>Writing to distill and share my experiences</li>
        </ul>

        <p className="pt-6 border-t border-gray-200 mt-8">
          If you’d like to reach out or share your thoughts, feel free to email me at{' '}
          <a
            href="mailto:kanishksanjaybanker@gmail.com"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
          >
            kanishksanjaybanker@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
