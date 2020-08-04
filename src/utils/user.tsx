import React from 'react';
import User from 'src/api/User';

export const analyzeUserProfile = (user: User) => (
  [
    {
      status: !!user.profilePicture,
      message: 'Your profile picture',
    },
    {
      status: !!user.specialization,
      message: 'Your specialisation',
    },
    {
      status: user.sectors?.length,
      message: (<><strong>At least one</strong> industry sector you work in</>),
    },
    {
      status: !!user.location && !!user.country,
      message: 'Your location and country',
    },
    {
      status: !!user.experience,
      message: 'Years of professional experience',
    },
    {
      status: user.languages?.length,
      message: (<><strong>At least one</strong> language you speak</>),
    },
    {
      status: user.tools?.length,
      message: 'Modelling/rendering tool(s) you use',
    },
    {
      status: !!user.dailyRate,
      message: 'Your daily rate',
    },
    {
      status: user.designs?.length > 1,
      message: (<><strong>At least two</strong> sample designs</>),
    },
    {
      status: !!user.description,
      message: 'Brief description of your professional experience',
    },
    {
      status: user.history?.length,
      message: 'Timeline of your professional and academic experience',
    },
    {
      status: user.uniqueSkills?.some(({ skill }) => skill.length),
      message: (<><strong>At least one</strong> unique skill</>),
    },
    {
      status: user.contactEmail || user.phone,
      message: (<>Contact e-mail address <strong>or</strong> phone number</>),
    },
  ]
);
export const getUserProfileProblems = (user: User, analysis) => (
  analysis.filter(({ status }) => !status)
);
export const getUserProfileStatus = (user: User, problems) => {
  const analysis = analyzeUserProfile(user);

  if (!problems) {
    // eslint-disable-next-line no-param-reassign
    problems = getUserProfileProblems(user, analysis);
  }

  if (analysis.length === problems.length) {
    return 'new';
  }

  if (problems.length) {
    return 'incomplete';
  }

  return 'complete';
};
