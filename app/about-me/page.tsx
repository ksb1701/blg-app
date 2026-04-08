import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-teal-600 mb-6">About Me</h1>

      <div className="space-y-6 text-lg leading-relaxed text-slate-600">
        <p>Hello! I’m Kanishk Banker, a tech enthusiast and writer.</p>

        <p>
          I created this blog to share my thoughts, discuss ideas, and reflect on things I enjoy, like art, technology,
          and life in general. I hope that my words resonate with you and maybe inspire you in some way.
        </p>

        <p className="font-medium text-slate-900">In my free time, I enjoy:</p>

        <ul className="list-disc list-outside space-y-2 ml-6">
          <li>Exploring new technologies and projects</li>
          <li>Reading and reflecting on thought-provoking topics</li>
          <li>Writing to distill and share my experiences</li>
        </ul>

        <p className="pt-8 border-t border-slate-200 mt-10">
          If you’d like to reach out or share your thoughts, feel free to email me at{' '}
          <a
            href="mailto:kanishksanjaybanker@gmail.com"
            className="text-teal-600 hover:text-teal-700 hover:underline font-medium transition-colors"
          >
            kanishksanjaybanker@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
