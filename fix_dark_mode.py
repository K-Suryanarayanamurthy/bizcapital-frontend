from pathlib import Path

files = [
    'src/pages/Register.jsx',
    'src/pages/Proposals.jsx',
    'src/pages/ProposalDetail.jsx',
    'src/pages/CreateProposal.jsx',
    'src/pages/EditProposal.jsx',
    'src/pages/EditProfile.jsx',
    'src/pages/ChangePassword.jsx',
    'src/pages/ForgotPassword.jsx',
    'src/pages/ResetPassword.jsx',
    'src/pages/VerifyOTP.jsx',
    'src/pages/Feedback.jsx',
    'src/pages/Messaging.jsx',
    'src/pages/Dashboard.jsx'
]
replacements = [
    ('bg-gray-50', 'bg-gray-50 dark:bg-gray-900'),
    ('bg-white', 'bg-white dark:bg-gray-800'),
    ('border-gray-200', 'border-gray-200 dark:border-gray-700'),
    ('border-gray-100', 'border-gray-100 dark:border-gray-700'),
    ('text-gray-800', 'text-gray-800 dark:text-white'),
    ('text-gray-500', 'text-gray-500 dark:text-gray-400'),
    ('text-gray-600', 'text-gray-600 dark:text-gray-300'),
    ('bg-blue-100', 'bg-blue-100 dark:bg-blue-900'),
    ('text-blue-700', 'text-blue-700 dark:text-blue-300'),
    ('bg-blue-700', 'bg-blue-700 dark:bg-blue-600'),
    ('bg-red-50', 'bg-red-50 dark:bg-red-900/20'),
    ('text-red-600', 'text-red-600 dark:text-red-400'),
    ('bg-green-50', 'bg-green-50 dark:bg-green-900/20'),
    ('text-green-600', 'text-green-600 dark:text-green-400'),
    ('bg-gray-100', 'bg-gray-100 dark:bg-gray-800'),
    ('hover:bg-gray-50', 'hover:bg-gray-50 dark:hover:bg-gray-800'),
    ('hover:bg-blue-50', 'hover:bg-blue-50 dark:hover:bg-gray-800'),
    ('bg-blue-50', 'bg-blue-50 dark:bg-blue-950'),
    ('border-blue-700', 'border-blue-700 dark:border-blue-400'),
    ('text-gray-400', 'text-gray-400 dark:text-gray-500')
]

for file_path in files:
    path = Path(file_path)
    if not path.exists():
        print('MISSING', file_path)
        continue
    text = path.read_text(encoding='utf-8')
    original = text
    for old, new in replacements:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding='utf-8')
        print('Updated', file_path)
    else:
        print('No changes', file_path)
