import { NextResponse } from 'next/server';

interface YouTubeOEmbed {
  title: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) {
    return NextResponse.json(
      { error: 'Video URL is required' },
      { status: 400 }
    );
  }

  try {
    const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
    const response = await fetch(oEmbedUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch video data');
    }

    const data: YouTubeOEmbed = await response.json();
    
    return NextResponse.json({
      title: data.title,
      thumbnailUrl: data.thumbnail_url,
    });
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video data' },
      { status: 500 }
    );
  }
}

