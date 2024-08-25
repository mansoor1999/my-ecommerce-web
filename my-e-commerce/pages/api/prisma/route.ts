import { NextRequest } from 'next/server'

  export async function GET(request: NextRequest) {
    try {
      return Response.json({ data: 'result' }, { status: 200 });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }
  
  export async function POST(request: NextRequest) {
    try {
      return Response.json({ message: 'Successfully Created' }, { status: 200 });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }
  
  export async function PUT(request: NextRequest) {
    try {
      return Response.json({ message: 'Successfully Updated' }, { status: 200 });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }
  
  export async function DELETE(request: NextRequest) {
    try {
      return Response.json({ message: 'Successfully Deleted' }, { status: 200 });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }
  
  