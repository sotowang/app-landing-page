import { redirect } from 'next/navigation';

export default function PricingRedirect() {
  // 默认重定向到中文版meeting/pricing页面
  redirect('/zh/meeting/pricing');
}
