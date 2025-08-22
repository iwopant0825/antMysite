// 프로젝트 카드에 표시할 데이터만 수정하면 됩니다.
// image: 퍼블릭 경로(/로 시작) 또는 외부 URL
export const projects = [
    {
        id: 'p1',
        title: 'SaveQuest',
        description:
          'SaveQuest는 게이미피케이션을 통해 절약을 재미있게 만드는 챌린지 기반 금융 앱입니다. 사용자는 일일·주간·월간 목표를 설정하고 진행 상황을 실시간으로 추적할 수 있으며, 목표 달성 시 포인트와 보상을 얻습니다. 또한 친구들과 함께 챌린지에 참여해 경쟁하거나, Tip Point 시스템을 통해 절약 팁을 공유하며 건전한 소비 습관을 형성하도록 돕습니다.',
        image: '/projectImg/1.png',
        demo: '#',
        github: 'https://github.com/SaveQuest/frontend.git',
        tech: ['React Native', 'Figma'],
      },
      {
        id: 'p2',
        title: '스팟',
        description:
          '스팟은 중·고등학생을 위한 카드 기반 소셜 매칭 앱입니다. 사용자는 익명 혹은 실명으로 감정 카드를 주고받으며 자연스럽게 연결될 수 있고, 받은 카드를 SNS에 공유해 재미를 더할 수 있습니다. 매칭이 성사되면 카카오톡이나 인스타그램 DM으로 바로 이어져 실제 대화로 발전하도록 설계되었습니다. 핵심은 익명 카드 시스템과 SNS 공유 기능을 통한 설렘과 호기심, 그리고 직관적인 매칭 경험입니다.',
        image: '/projectImg/2.png',
        demo: '#',
        github: '#',
        tech: ['React Native', 'Figma'],
      },
      {
        id: 'p3',
        title: '바야바즈 (App to Web)',
        description:
          '바야바즈는 AI 기반 탈모 관리 플랫폼으로, 개인 맞춤형 진단과 습관 개선 솔루션을 제공합니다. 일본 최대 탈모 관리 기업 리브21과 공동 연구 개발을 진행하며, 46년간 축적된 데이터와 노하우를 활용해 두피 상태와 생활 패턴을 분석하고 최적의 관리 방법을 제시합니다.',
        image: '/projectImg/3.png',
        demo: 'https://bayabastest.pages.dev/',
        github: '#',
        tech: ['React Native', 'Figma'],
      },
      {
        id: 'p4',
        title: '라움',
        description:
          '라움은 선린인터넷고등학교 콘텐츠디자인과 일러스트 동아리의 입니다. 동아리 소개, 작품 전시, 활동 기록을 담아내는 웹사이트를 디자인하고 개발했습니다.',
        image: '/projectImg/4.png',
        demo: 'https://laum.pages.dev/',
        github: 'https://github.com/iwopant0825/LAUM.git',
        tech: ['React', 'Figma'],
      },      
      {
        id: 'p5',
        title: '문화유산 박물관 메타버스',
        description:
          '퀴즈를 맞추며 문화유산에 대해 알아가는 박물관 메타버스 웹사이트',
        image: '/projectImg/5.png',
        demo: 'https://museumcbg.pages.dev/',
        github: '#',
        tech: ['React', 'Figma'],
      },  
      {
        id: 'p6',
        title: 'CLIMATION',
        description:
          'CLIMATION은 기후 변화 대응을 위한 액션 플랫폼으로, Climate과 Action을 결합한 이름에서 알 수 있듯 지속가능한 미래를 위한 실질적 해결책을 제시합니다. 탄소 배출 감축, 재생 에너지 전환, 기후 적응 전략 등 다양한 주제를 다루며, 교육 콘텐츠와 커뮤니티를 통해 기후 행동을 확산시키는 것을 목표로 합니다.',
        image: '/projectImg/6.png',
        demo: 'https://museumcbg.pages.dev/',
        github: '#',
        tech: ['React', 'Figma'],
      },  
      {
        id: 'p7',
        title: 'REstyle',
        description:
          'REstyle은 지속가능한 패션을 지향하는 프로젝트입니다. Reuse, Restyle, Recycle을 핵심 가치로 삼아 기존 의류를 새롭게 스타일링하거나 업사이클링하는 방법을 제안합니다. 환경 친화적인 소재와 맞춤 제작, 지역 생산 방식을 통해 패션 산업의 환경적 부담을 줄이고, 새로운 패션 문화를 만들어갑니다.',
        image: '/projectImg/7.png',
        demo: 'https://museumcbg.pages.dev/',
        github: '#',
        tech: ['React', 'Figma'],
      },  
      {
        id: 'p8',
        title: 'AiGS',
        description:
          'AiGS는 인공지능 기반 솔루션과 연구를 다루는 프로젝트로, AI 기술을 통해 자동화, 데이터 인텔리전스, 워크플로우 최적화를 실현합니다. 또한 AI 거버넌스와 안전성까지 고려하여 기술의 긍정적 영향력을 확대하는 것을 목표로 합니다. 교육, 연구, 실제 활용까지 아우르는 AI 혁신 플랫폼입니다.',
        image: '/projectImg/8.png',
        demo: 'https://museumcbg.pages.dev/',
        github: '#',
        tech: ['React', 'Figma'],
      },  
      
];

// 소규모(기타) 프로젝트들
export const miniProjects = [
  {
    id: 'm1',
    title: '문화유산 박물관 메타버스',
    description: '퀴즈를 맞추며 문화유산에 대해 알아가는 박물관 메타버스 웹사이트',
    link: 'https://museumcbg.pages.dev/'
  },
];


