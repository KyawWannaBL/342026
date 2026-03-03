# Express Delivery Management System - Comprehensive RBAC Implementation

## 🎯 Overview

This Express Delivery Management System implements a **comprehensive Role-Based Access Control (RBAC)** system based on a granular SRS specification. The system provides **screen-level and API-level permissions** with **segregation of duties**, **audit trails**, and **policy enforcement** for enterprise-grade express delivery operations.

## 🏗️ System Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui
- **Backend**: Firebase (Firestore + Authentication + Storage + Security Rules)
- **Security**: Comprehensive Firestore security rules with RBAC
- **State Management**: Enhanced React Context with RBAC hooks
- **Real-time**: Firebase real-time listeners with scope-based filtering

### Core Components
1. **Enhanced RBAC System** (`src/lib/rbac.ts`)
2. **Comprehensive Security Rules** (`firestore.rules`)
3. **Enhanced Firebase Services** (`src/lib/enhancedFirebaseServices.ts`)
4. **RBAC Authentication Hooks** (`src/hooks/useEnhancedAuth.ts`)

## 👥 Role Matrix & Permissions

### Role Hierarchy (L0-L5)

| Level | Roles | Description | Scope |
|-------|-------|-------------|-------|
| **L0** | CUS, MER, INT | External Users | S1 (Self) |
| **L1** | CSA, CCA, CUR, HSC, CSH | Operational Staff | S1-S3 |
| **L2** | DSP, HSP, FLM, BIL, AR, CLM, HRO | Supervisory Staff | S3-S4 |
| **L3** | BMG, ROM | Management Staff | S3-S4 |
| **L4** | FINM, CAP, HRM | Department Heads | S5 |
| **L5** | AUD, SYS | System Level | S5 |

### Data Scopes (S1-S5)

- **S1 (Self)**: Own data only
- **S2 (Team)**: Team-level access
- **S3 (Branch/Hub)**: Branch/Hub-level access
- **S4 (Region)**: Regional access
- **S5 (Company)**: Company-wide access

### Action Types

- **V**: View/Read
- **C**: Create
- **U**: Update/Edit
- **D**: Delete/Cancel/Void
- **X**: Execute/Process (operational actions)
- **A**: Approve (workflow approvals)
- **E**: Export (CSV/XLS/PDF)
- **CFG**: Configure (master data/rules)

## 🖥️ Screen-Based Permissions

### External/Customer Portal (EXT-01 to EXT-09)

| Screen ID | Function | Scope | Permissions |
|-----------|----------|-------|-------------|
| EXT-01 | Public Tracking | S1 | CUS:V, MER:V |
| EXT-02 | Delivery Reschedule | S1 | CUS:C/U, MER:C/U |
| EXT-03 | Create Shipment (single) | S1 | MER:C |
| EXT-04 | Bulk Upload Shipments | S1 | MER:X |
| EXT-05 | Pickup Request | S1 | MER:C/U |
| EXT-06 | Invoices & Statements | S1 | MER:V/E |
| EXT-07 | COD Settlement View | S1 | MER:V/E |
| EXT-08 | Claims Submission | S1 | MER:C/V |
| EXT-09 | Support Tickets | S1 | CUS:V/C, MER:V/C |

### Booking & Shipment Management (OPS-01 to OPS-07)

| Screen ID | Function | Scope | Permissions | Notes |
|-----------|----------|-------|-------------|-------|
| OPS-01 | Shipment Create (Counter) | S3 | CSA:C, BMG:C, SYS:C | MER uses EXT-03 |
| OPS-02 | Shipment Edit (pre-pickup) | S3 | CSA:U, BMG:U, SYS:U | Locked after pickup |
| OPS-03 | Cancel Shipment (pre-pickup) | S3 | CSA:D, BMG:D, SYS:D | Reason required |
| OPS-04 | Shipment Detail (full timeline) | S3-S5 | CSA:V, CCA:V, DSP:V, HSP:V, BMG:V, ROM:V, AUD:V, SYS:V | PII masking by role |
| OPS-04A | Cancel After Pickup (Exception) | S3 | BMG:A, ROM:A, SYS:A | Requires approval |
| OPS-05 | Reweigh / Redimension | S3 | CSA:X, HSP:X, BMG:A, SYS:X | Price impact triggers billing |
| OPS-06 | Address Correction | S4 | CCA:U, BMG:A, SYS:U | Audit trail + notification |
| OPS-07 | Service Upgrade/Downgrade | S3 | CSA:U, BMG:A, SYS:U | Repricing + invoice recalc |

### Pickup & Dispatch (PUP-01 to PUP-06)

| Screen ID | Function | Scope | Permissions | Notes |
|-----------|----------|-------|-------------|-------|
| PUP-01 | Pickup Queue / Requests | S3-S4 | DSP:V/X, CCA:V, BMG:V, ROM:V | Assignments + capacity |
| PUP-02 | Pickup Assignment | S3-S4 | DSP:X, BMG:A, SYS:X | Optional approval for high-value |
| PUP-03 | Courier Pickup App - Job List | S1 | CUR:V | Only assigned jobs |
| PUP-04 | Pickup Scan (Accept/Collected) | S1 | CUR:X | Offline-first, mandatory photo |
| PUP-05 | Pickup Exception (Failed pickup) | S1 | CUR:X | Reason codes, customer notification |
| PUP-06 | Pickup Manifest Print | S3 | CSA:X, DSP:X | Paper fallback |

### Hub Operations (HUB-01 to HUB-07)

| Screen ID | Function | Scope | Permissions | Notes |
|-----------|----------|-------|-------------|-------|
| HUB-01 | Inbound Scan | S3 | HSC:X, HSP:X | Scan location enforced |
| HUB-02 | Sorting Workbench | S3 | HSC:X, HSP:X | Auto-sort + manual override |
| HUB-03 | Bag Create / Close / Seal | S3 | HSC:X, HSP:X | Seal ID mandatory |
| HUB-04 | Bag Open / Reseal | S3 | HSP:X, BMG:A, SYS:X | Requires approval + reason |
| HUB-05 | Misroute Handling | S3 | HSP:X, BMG:A, SYS:X | Root cause capture |
| HUB-06 | Hub Backlog Monitor | S3-S5 | HSP:V, BMG:V, ROM:V, AUD:V, SYS:V | KPI drilldown |
| HUB-07 | Damage/Loss Incident | S3 | HSP:C, BMG:A, CLM:V | Creates claim evidence |

### Finance Operations (FIN-01 to FIN-06, BILL-01 to BILL-06)

| Screen ID | Function | Scope | Permissions | Notes |
|-----------|----------|-------|-------------|-------|
| FIN-01 | Courier COD Entry (Mobile) | S1 | CUR:X | Submit-only, no edit after |
| FIN-02 | Branch COD Reconciliation | S3 | CSH:X, BMG:V, FINM:V | Expected vs collected |
| FIN-03 | Daily Cash Close | S3 | CSH:X, BMG:A | Locks day, variance case |
| FIN-04 | COD Variance Case | S3-S5 | CSH:C, FINM:A, AUD:V | Write-offs by FINM only |
| FIN-05 | Merchant Settlement Run | S5 | FINM:X, SYS:X | Payout files + audit |
| FIN-06 | Settlement Exceptions | S5 | FINM:A, SYS:A | Failed payouts/chargebacks |
| BILL-01 | Invoice Generation | S4 | BIL:X, FINM:V, SYS:X | Batch schedules |
| BILL-02 | Invoice Draft Review | S4 | BIL:U, FINM:A | Approval if adjustments |
| BILL-03 | Credit Note / Rebill | S5 | BIL:C, FINM:A, SYS:X | Mandatory reason + attachment |
| BILL-04 | AR Aging Dashboard | S4-S5 | AR:V/X, FINM:V, AUD:V | Collections workflow |
| BILL-05 | Credit Limit / Block-Unblock | S5 | AR:C, FINM:A, SYS:X | SoD enforced |

### Claims & Disputes (CLM-01 to CLM-04)

| Screen ID | Function | Scope | Permissions | Notes |
|-----------|----------|-------|-------------|-------|
| CLM-01 | Claim Case Create | S4 | CLM:C, CCA:C, SYS:C | Must link AWB + evidence |
| CLM-02 | Claim Investigation | S4 | CLM:U/X, BMG:V, AUD:V | Evidence lock controls |
| CLM-03 | Claim Approval | S5 | CAP:A, FINM:A, SYS:A | Dual approval above threshold |
| CLM-04 | Dispute Register (Billing) | S4 | BIL:C/U, FINM:A | Credit note workflow |

### HR & Workforce (HR-01 to HR-07)

| Screen ID | Function | Scope | Permissions | Notes |
|-----------|----------|-------|-------------|-------|
| HR-01 | Employee Master | S5 | HRO:V, HRM:CFG, SYS:CFG | PII masking for non-HR |
| HR-02 | Shift/Roster | S4-S5 | HRO:X, HRM:A, SYS:X | Schedule management |
| HR-03 | Attendance Capture (GPS) | S1 | CUR:X, HSC:X | App-based |
| HR-04 | Attendance Correction | S4-S5 | HRO:C, HRM:A, AUD:V | Keep original + correction |
| HR-05 | KPI Scorecards | S4-S5 | HRO:V/E, HRM:V/E, ROM:V | Performance tracking |
| HR-06 | Incentive Rules Config | S5 | HRM:CFG, FINM:V, SYS:CFG | Finance visibility |
| HR-07 | Incentive Approval/Posting | S5 | HRM:A, FINM:A | Dual approval for payout |

### Administration (ADM-01 to ADM-06)

| Screen ID | Function | Scope | Permissions | Notes |
|-----------|----------|-------|-------------|-------|
| ADM-01 | Master Data Config | S5 | SYS:CFG, FINM:CFG, HRM:CFG | Domain-specific |
| ADM-02 | RBAC Role Manager | S5 | SYS:CFG | No other role allowed |
| ADM-03 | User Provisioning | S5 | SYS:CFG | Invite/deactivate/reset MFA |
| ADM-04 | Integrations & API Keys | S5 | SYS:CFG | Scoped tokens only |
| ADM-05 | Notification Templates | S5 | SYS:CFG, ROM:V | Template management |
| ADM-06 | Data Retention / Purge | S5 | SYS:CFG, AUD:V | Highly restricted |

## 🔌 API Permission Groups

### Public/External APIs
- **API-PUB-TRK**: Public tracking (CUS, MER, INT)
- **API-EXT-ORD**: Portal shipments (MER)
- **API-EXT-PUP**: Portal pickups (MER)
- **API-EXT-BILL**: Portal billing (MER)
- **API-EXT-CS**: Portal support (CUS, MER)

### Core Operations APIs
- **API-OPS-SHP**: Shipment management (CSA, BMG, SYS)
- **API-OPS-SCAN**: Scan events (CUR, HSC, HSP, Driver, INT)
- **API-OPS-PUP**: Pickup operations (DSP, BMG, ROM)
- **API-OPS-RUN**: Runsheet management (DSP, BMG, SYS)
- **API-OPS-EXC**: Exception approvals (BMG, ROM, SYS)
- **API-OPS-RTO**: Returns processing (DSP, BMG, ROM)

### Finance APIs
- **API-FIN-COD**: COD operations (CUR, CSH, FINM)
- **API-FIN-CASH**: Cash management (CSH, BMG)
- **API-FIN-SETTLE**: Settlement processing (FINM, SYS)
- **API-FIN-INVOICE**: Invoice management (BIL, FINM)
- **API-FIN-AR**: AR operations (AR, FINM)

### Support & Claims APIs
- **API-CS-TKT**: Support tickets (CCA, CSA, SYS)
- **API-CLM**: Claims management (CLM, CAP, FINM)

### Admin APIs
- **API-HR-ATT**: Attendance (CUR, HSC, HRO, HRM)
- **API-HR-INC**: Incentives (HRM, FINM)
- **API-FLT**: Fleet management (FLM, SYS)
- **API-REP**: Reporting (Role-based)
- **API-ADM-RBAC**: RBAC management (SYS only)

## 🛡️ Security Policies & Rules

### Hard Policy Rules

1. **Scan Events Immutable**: No edit/delete; only compensating events
2. **COD Submit Lock**: Courier cannot edit COD after submit; variance via case + approval
3. **Price Override Approval**: CSA requests; BMG/FINM approve based on policy
4. **Segregation of Duties (SoD)**: User who creates cannot approve (except SYS)
5. **PII Masking**: Hub/transport roles see masked phone/address unless needed
6. **Export Restrictions**: Export permission separate from view; watermark + audit logs

### Approval Workflows

| Action | Threshold | Approvers | Notes |
|--------|-----------|-----------|-------|
| Price Override | >$100 | BMG, FINM | Reason + audit required |
| Credit Note | >$1000 | FINM | Mandatory attachments |
| Claim Settlement | >$5000 | CAP, FINM | Dual approval |
| COD Variance | >$500 | FINM | Write-off case |
| Cancel After Pickup | Any | BMG, ROM, SYS | Exception handling |
| Cash Close | Any | BMG | Daily reconciliation |

### Audit & Compliance

- **Immutable Audit Trail**: All actions logged with user, timestamp, details
- **Export Logging**: All exports watermarked and logged
- **Access Logging**: Screen and API access tracked
- **SoD Violations**: Automatically prevented by security rules
- **Data Retention**: Configurable retention policies
- **Compliance Reports**: Role-based access to audit data

## 🚀 Implementation Features

### Enhanced Authentication
```typescript
const { 
  user, 
  hasPermission, 
  canApprove, 
  requiresApproval,
  logUserAction 
} = useAuth();

// Screen-specific permissions
const { canView, canCreate, canUpdate, canDelete } = useScreenPermissions('OPS-01');

// API permissions
const { canAccess } = useAPIPermissions('API-OPS-SHP');

// Approval workflow
const { checkCanApprove, checkApprovalRequired } = useApprovalWorkflow();
```

### Real-time Security
- **Scope-based filtering**: Users only see data within their scope
- **PII masking**: Automatic masking based on role
- **Live permission checks**: Real-time validation of user actions
- **Session management**: Automatic timeout and re-authentication

### Data Protection
- **Field-level security**: Sensitive fields protected by role
- **Immutable events**: Critical events cannot be modified
- **Audit trails**: Complete history of all changes
- **Export controls**: Watermarked exports with audit logging

## 📋 Setup Instructions

### 1. Firebase Configuration
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init

# Deploy security rules
firebase deploy --only firestore:rules
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Update with your Firebase config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 3. Database Seeding
```bash
# Install dependencies
npm install

# Run database seeding
npm run seed-db
```

### 4. Development
```bash
# Start development server
npm run dev

# Run with Firebase emulators
npm run firebase:emulators
```

## 🧪 Testing the RBAC System

### Sample User Accounts
After seeding, test with these accounts:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| System Admin | admin@expressdelivery.com | admin123 | Full system access |
| Branch Manager | manager@expressdelivery.com | manager123 | Branch-level management |
| Courier | rider1@expressdelivery.com | rider123 | Assigned deliveries only |
| Customer Service | cs@expressdelivery.com | cs123 | Shipment creation & support |
| Finance Manager | finance@expressdelivery.com | finance123 | Financial operations |

### Testing Scenarios

1. **Permission Validation**: Try accessing restricted screens with different roles
2. **Approval Workflows**: Test approval requirements for various actions
3. **Data Scoping**: Verify users only see data within their scope
4. **PII Masking**: Check that sensitive data is masked appropriately
5. **Audit Logging**: Verify all actions are logged correctly
6. **SoD Enforcement**: Test that users cannot approve their own work

## 📚 Documentation

- **API Documentation**: `/docs/api.md`
- **Security Rules**: `/docs/security-rules.md`
- **User Guide**: `/docs/user-guide.md`
- **Admin Guide**: `/docs/admin-guide.md`

## 🔄 Maintenance

### Regular Tasks
- Review audit logs weekly
- Update user permissions quarterly
- Backup security rules before changes
- Monitor failed authentication attempts
- Review and update approval thresholds

### Security Updates
- Regular security rule reviews
- User access audits
- Permission matrix updates
- Compliance reporting
- Incident response procedures

---

This comprehensive RBAC implementation ensures enterprise-grade security, compliance, and operational efficiency for express delivery management operations.