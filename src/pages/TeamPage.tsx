import React from 'react'
import { Linkedin, Mail, Github } from 'lucide-react'

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Айбек Токтогулов',
      position: 'CEO & Основатель',
      image: '/api/placeholder/300/300',
      bio: 'Эксперт в области e-commerce с 10-летним опытом',
      social: {
        linkedin: '#',
        email: 'aibek@luxmart.com'
      }
    },
    {
      name: 'Айнура Асанова',
      position: 'CTO',
      image: '/api/placeholder/300/300',
      bio: 'Технический директор, специалист по современным технологиям',
      social: {
        linkedin: '#',
        github: '#',
        email: 'ainura@luxmart.com'
      }
    },
    {
      name: 'Эрлан Беков',
      position: 'Head of Marketing',
      image: '/api/placeholder/300/300',
      bio: 'Маркетинг-директор с опытом в digital-продвижении',
      social: {
        linkedin: '#',
        email: 'erlan@luxmart.com'
      }
    },
    {
      name: 'Жылдыз Кыдырова',
      position: 'Head of Customer Service',
      image: '/api/placeholder/300/300',
      bio: 'Руководитель службы поддержки клиентов',
      social: {
        linkedin: '#',
        email: 'zhyldyz@luxmart.com'
      }
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Наша команда
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Познакомьтесь с людьми, которые делают Luxmart лучше каждый день
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6 text-center group hover:shadow-lg transition-shadow">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {member.name}
            </h3>
            
            <p className="text-primary-600 font-medium mb-3">
              {member.position}
            </p>
            
            <p className="text-gray-600 text-sm mb-4">
              {member.bio}
            </p>
            
            <div className="flex justify-center space-x-3">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              
              {member.social.github && (
                <a
                  href={member.social.github}
                  className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              
              {member.social.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Присоединяйтесь к нашей команде
        </h2>
        <p className="text-gray-600 mb-6">
          Мы всегда ищем талантливых людей, готовых изменить мир e-commerce
        </p>
        <a
          href="mailto:careers@luxmart.com"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Mail className="w-4 h-4 mr-2" />
          Отправить резюме
        </a>
      </div>
    </div>
  )
}

export default TeamPage
