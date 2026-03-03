export const ROLE_MATRIX: any = {
  // L5 = Full Access (God Mode)
  SYS: { level: 'L5', scope: 'S5', permissions: ['*'] },
  APP_OWNER: { level: 'L5', scope: 'S5', permissions: ['*'] },
  SUPER_ADMIN: { level: 'L5', scope: 'S5', permissions: ['*'] },
  
  // Operational Roles
  MER: { level: 'L0', scope: 'S1', permissions: ['EXT-01'] },
  CUR: { level: 'L1', scope: 'S1', permissions: ['PUP-01'] }
};

export const normalizeRole = (role: string | null | undefined) => {
  if (!role) return null;
  const clean = role.trim().toUpperCase();
  // Map the truncated 'SUPER_A' seen in logs back to 'SUPER_ADMIN'
  if (clean === 'SUPER_A') return 'SUPER_ADMIN';
  return clean;
};

export const getEffectivePermissions = (role: string | null | undefined) => {
  const cleanRole = normalizeRole(role);
  if (!cleanRole) return [];
  
  // DEFENSIVE CHECK: Grant '*' if the role STARTS with these strings
  if (
    cleanRole.startsWith('SYS') || 
    cleanRole.startsWith('APP_OWNER') || 
    cleanRole.startsWith('SUPER_ADMIN')
  ) {
    return ['*'];
  }
  
  return ROLE_MATRIX[cleanRole]?.permissions || [];
};

export const checkPermission = (role: string | null | undefined, perm: string) => {
  if (!role) return false;
  const cleanRole = normalizeRole(role);

  // DEFENSIVE CHECK: Bypass for all admin variations
  if (
    cleanRole?.startsWith('SYS') || 
    cleanRole?.startsWith('APP_OWNER') || 
    cleanRole?.startsWith('SUPER_ADMIN')
  ) {
    return true;
  }

  const roleData = ROLE_MATRIX[cleanRole || ''];
  return roleData?.permissions?.includes(perm) || roleData?.permissions?.includes('*') || false;
};