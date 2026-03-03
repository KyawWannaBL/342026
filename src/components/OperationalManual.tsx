// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { QrCode, Smartphone, Camera, MapPin, Clock, AlertTriangle, CheckCircle, Package, Truck, Users } from 'lucide-react';

export function OperationalManual() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Express Delivery QR Operations Manual</h1>
        <p className="text-muted-foreground">Comprehensive guide for QR code scanning, POD capture, and exception handling</p>
      </div>

      {/* QR Code System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code System Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">What is the QR Code System?</h4>
              <p className="text-sm text-muted-foreground">
                Our QR code system provides real-time tracking and verification for all shipments. 
                Each package gets a unique QR code that contains encrypted shipment information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Benefits</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time shipment tracking</li>
                <li>• Reduced manual errors</li>
                <li>• Faster processing times</li>
                <li>• Enhanced security</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Design & Structure */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code Design & Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">QR Code Contains:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>AWB Number:</strong> Unique shipment identifier</p>
                <p><strong>Checksum:</strong> Data integrity verification</p>
                <p><strong>Version:</strong> QR code format version</p>
              </div>
              <div>
                <p><strong>Routing Info:</strong> Destination hub/branch</p>
                <p><strong>Timestamp:</strong> Generation time</p>
                <p><strong>Security Hash:</strong> Anti-tampering protection</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Label Placement Guidelines:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Place on the top-right corner of the package</li>
              <li>• Ensure the label is flat and not wrinkled</li>
              <li>• Avoid placing over seams or edges</li>
              <li>• Keep away from other barcodes or labels</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Printing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            QR Code Printing Process
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold">Generate</h4>
              <p className="text-sm text-muted-foreground">System generates QR code with shipment details</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold">Print</h4>
              <p className="text-sm text-muted-foreground">Print on thermal label printer with customer info</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold">Apply</h4>
              <p className="text-sm text-muted-foreground">Affix label to package following placement guidelines</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scanning Procedures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            QR Code Scanning Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pickup Scanning */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Badge variant="outline">Pickup</Badge>
              Pickup Scanning
            </h4>
            <div className="space-y-2 text-sm">
              <p><strong>When:</strong> At customer location during pickup</p>
              <p><strong>Who:</strong> Courier/Pickup Agent</p>
              <p><strong>Process:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Open QR Scanner app</li>
                <li>Select "Pickup Scan" mode</li>
                <li>Scan QR code on package</li>
                <li>Verify AWB matches pickup list</li>
                <li>Capture GPS location automatically</li>
                <li>Add any pickup notes if needed</li>
                <li>Confirm scan to update status</li>
              </ol>
            </div>
          </div>

          <Separator />

          {/* Hub Scanning */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Badge variant="outline">Hub</Badge>
              Hub Inbound/Outbound Scanning
            </h4>
            <div className="space-y-2 text-sm">
              <p><strong>When:</strong> Package arrival and departure at hub</p>
              <p><strong>Who:</strong> Hub Scanner/Sorter</p>
              <p><strong>Process:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Select appropriate scan mode (Inbound/Outbound)</li>
                <li>Scan packages in batches</li>
                <li>System validates routing information</li>
                <li>Sort packages according to destination</li>
                <li>Generate bag/manifest reports</li>
                <li>Seal bags and update system</li>
              </ol>
            </div>
          </div>

          <Separator />

          {/* Delivery Scanning */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Badge variant="outline">Delivery</Badge>
              Delivery Scanning
            </h4>
            <div className="space-y-2 text-sm">
              <p><strong>When:</strong> At customer location during delivery</p>
              <p><strong>Who:</strong> Delivery Courier</p>
              <p><strong>Process:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Select "Delivery Scan" mode</li>
                <li>Scan package QR code</li>
                <li>Verify delivery address</li>
                <li>Proceed to POD capture</li>
                <li>Complete delivery confirmation</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* POD (Proof of Delivery) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Electronic Proof of Delivery (e-POD)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Signature POD
              </h4>
              <p className="text-sm text-muted-foreground">
                Customer signs on mobile device screen. Capture clear signature with recipient name.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                OTP POD
              </h4>
              <p className="text-sm text-muted-foreground">
                Customer provides OTP sent to their mobile. Verify and confirm delivery.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Photo POD
              </h4>
              <p className="text-sm text-muted-foreground">
                Take photo of delivered package at customer location with timestamp.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">POD Best Practices:</h4>
            <ul className="text-sm space-y-1">
              <li>• Always verify recipient identity</li>
              <li>• Ensure GPS location is captured</li>
              <li>• Take clear, well-lit photos</li>
              <li>• Get complete signature (not just initials)</li>
              <li>• Record any special delivery instructions</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Exception Handling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Exception Handling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Common Delivery Exceptions:</h4>
              <ul className="text-sm space-y-1">
                <li>• Customer not available</li>
                <li>• Incorrect/incomplete address</li>
                <li>• Customer refused delivery</li>
                <li>• Package damaged</li>
                <li>• Security concerns</li>
                <li>• Weather delays</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Exception Process:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Select exception type</li>
                <li>Provide detailed reason</li>
                <li>Take photo evidence (if required)</li>
                <li>Add additional notes</li>
                <li>Submit exception report</li>
                <li>Follow next action guidance</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Operational Controls & Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Quality Controls:</h4>
              <ul className="text-sm space-y-1">
                <li>• Verify QR code readability before dispatch</li>
                <li>• Ensure GPS is enabled on all devices</li>
                <li>• Regular device battery checks</li>
                <li>• Daily app synchronization</li>
                <li>• Photo quality verification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Security Measures:</h4>
              <ul className="text-sm space-y-1">
                <li>• Device authentication required</li>
                <li>• Encrypted data transmission</li>
                <li>• Audit trail for all scans</li>
                <li>• Role-based access control</li>
                <li>• Regular security updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">QR Code Won't Scan:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Clean camera lens</li>
                <li>• Ensure adequate lighting</li>
                <li>• Hold device steady</li>
                <li>• Try manual AWB entry</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">App Not Syncing:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check internet connection</li>
                <li>• Force sync from settings</li>
                <li>• Restart application</li>
                <li>• Contact IT support if persistent</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">GPS Not Working:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enable location services</li>
                <li>• Check app permissions</li>
                <li>• Move to open area</li>
                <li>• Restart device if needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Support & Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold">Technical Support:</h4>
              <p>Phone: 1800-XXX-TECH</p>
              <p>Email: tech-support@company.com</p>
            </div>
            <div>
              <h4 className="font-semibold">Operations Support:</h4>
              <p>Phone: 1800-XXX-OPS</p>
              <p>Email: ops-support@company.com</p>
            </div>
            <div>
              <h4 className="font-semibold">Emergency Escalation:</h4>
              <p>Phone: 1800-XXX-URGENT</p>
              <p>Available 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}